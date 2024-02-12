import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Anime } from './models.ts/anime.model';
import { MaterialData } from './models.ts/material-data.model';
import { Genre, GenreAnime, _AnimeToGenre } from './models.ts/genre.model';
import { Op } from 'sequelize';

interface kodikParseInterface {
  total: number;
  next_page: string;
  results: Anime[];
}

@Injectable()
export class AnimeService {
  constructor(
    @InjectModel(Anime) private AnimeModel: typeof Anime,
    @InjectModel(MaterialData) private MaterialDataModel: typeof MaterialData,
    @InjectModel(Genre) private GenreModel: typeof Genre,
    @InjectModel(GenreAnime) private GenreAnimeModel: typeof GenreAnime,
    @InjectModel(_AnimeToGenre)
    private _AnimeToGenreModel: typeof _AnimeToGenre,
  ) {}
  private async setRating(anime: Anime, material_data: MaterialData) {
    const { imdb_rating, kinopoisk_rating, shikimori_rating } =
      material_data || {};

    const definedRatings = [
      imdb_rating,
      kinopoisk_rating,
      shikimori_rating,
    ].filter(
      (rate) => rate !== null && rate !== undefined && !isNaN(Number(rate)),
    );

    const rating =
      definedRatings.reduce((sum, rating) => sum + Number(rating), 0) /
      definedRatings.length;

    anime.rating = parseFloat(rating.toFixed(2));
    await anime.save();
  }
  public async parseAnime() {
    const BASE_URL = process.env.KODIK_API_URL;
    const KODIK_TOKEN = process.env.KODIK_API_KEY;
    const { data: genresResults } = await axios.get<{
      results: { title: string; count: number }[];
    }>(`${BASE_URL}/genres?token=${KODIK_TOKEN}&types=anime-serial`);
    const { results: genres } = genresResults;
    for (const genre of genres) {
      const [newGenre, _] = await this.GenreModel.findCreateFind({
        where: {
          title: genre.title,
        },
        defaults: {
          title: genre.title,
          count: genre.count,
        },
      });
      let nextPage = null;
      do {
        const url = nextPage
          ? nextPage
          : `${BASE_URL}/list?token=${KODIK_TOKEN}&genres=${newGenre.title}&types=anime-serial,anime&with_episodes=true&with_material_data=true`;

        const { data } = await axios.get<kodikParseInterface>(url);

        const { results, next_page } = data;

        for (const anime of results) {
          const existingAnime = await this.AnimeModel.findOne({
            where: {
              [Op.or]: [{ id: anime.id }, { title: anime.title }],
            },
          });

          if (existingAnime) {
            await existingAnime.update(anime);
            const materialDataExists = await this.MaterialDataModel.findOne({
              where: {
                anime_id: existingAnime.anime_id,
              },
            });
            await this.setRating(existingAnime, materialDataExists);
            if (materialDataExists) {
              await materialDataExists.update(anime.material_data);
            } else {
              await this.MaterialDataModel.create({
                anime_id: existingAnime.anime_id,
                ...anime.material_data,
              });
            }

            continue;
          } else {
            const newAnime = await this.AnimeModel.create(anime);

            await this.GenreAnimeModel.create({
              genre_id: newGenre.id,
              anime_id: newAnime.anime_id,
            });
            await this._AnimeToGenreModel.create({
              B: newGenre.id,
              A: newAnime.anime_id,
            });
            const material_data = await this.MaterialDataModel.create({
              anime_id: newAnime.anime_id,
              ...anime.material_data,
            });
            await this.setRating(newAnime, material_data);
          }
        }

        nextPage = next_page;

        if (!nextPage) {
          console.log('Parsing completed');
        }
      } while (nextPage !== null);
    }
  }
}
