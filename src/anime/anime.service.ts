import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Anime } from './models.ts/anime.model';
import { MaterialData } from './models.ts/material-data.model';
import { Genre, GenreAnime } from './models.ts/genre.model';

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
  ) {}
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
              id: anime.id,
            },
          });

          if (existingAnime) {
            await existingAnime.update(anime);
            const materialDataExists = await this.MaterialDataModel.findOne({
              where: {
                anime_id: existingAnime.anime_id,
              },
            });
            if (materialDataExists) {
              await materialDataExists.update(anime.material_data);
            } else {
              await this.MaterialDataModel.create({
                anime_id: existingAnime.anime_id,
                ...anime.material_data,
              });
            }

            const genreAnimeExsits = await this.GenreAnimeModel.findOne({
              where: {
                genre_id: newGenre.id,
                anime_id: existingAnime.anime_id,
              },
            });
            if (!genreAnimeExsits) {
              await this.GenreAnimeModel.create({
                genre_id: newGenre.id,
                anime_id: existingAnime.anime_id,
              });
            }

            continue;
          }

          const newAnime = await this.AnimeModel.create(anime);

          await this.GenreAnimeModel.create({
            genre_id: newGenre.id,
            anime_id: newAnime.anime_id,
          });

          await this.MaterialDataModel.create({
            anime_id: newAnime.anime_id,
            ...anime.material_data,
          });
        }

        nextPage = next_page;

        if (!nextPage) {
          console.log('Parsing completed');
        }
      } while (nextPage !== null);
    }
  }
}
