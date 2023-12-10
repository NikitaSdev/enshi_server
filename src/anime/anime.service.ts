import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Anime } from './anime.model';
import axios from 'axios';

interface kodikParseInterface {
  total: number;
  next_page: string;
  results: Anime[];
}

@Injectable()
export class AnimeService {
  constructor(@InjectModel(Anime) private AnimeModel: typeof Anime) {}
  public async parseAnime() {
    const BASE_URL = process.env.KODIK_API_URL;
    const KODIK_TOKEN = process.env.KODIK_API_KEY;

    let nextPage = null;
    do {
      const url = nextPage
        ? nextPage
        : `${BASE_URL}/list?token=${KODIK_TOKEN}&types=anime-serial,anime&with_episodes=true&with_material_data=true`;

      const { data } = await axios.get<kodikParseInterface>(url);

      const { results, next_page } = data;

      for (const anime of results) {
        const existingAnime = await this.AnimeModel.findOne({
          where: {
            id: anime.id,
          },
        });

        if (existingAnime) {
          await existingAnime.destroy();
        }

        await this.AnimeModel.create(anime);
      }

      nextPage = next_page;

      if (!nextPage) {
        console.log('Parsing completed');
        return;
      }
    } while (nextPage !== null);
  }
}
