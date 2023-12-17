import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Anime } from 'src/anime/models.ts/anime.model';
import { Favourite, FavouriteAnime } from 'src/anime/models.ts/favourite.model';
import { Genre, GenreAnime } from 'src/anime/models.ts/genre.model';
import { HomeSlider } from 'src/anime/models.ts/home-slider.model';
import { MaterialData } from 'src/anime/models.ts/material-data.model';
import { User } from 'src/anime/models.ts/user.model';
import { Viewed, ViewedAnime } from 'src/anime/models.ts/viewed.model';

export const postgresConfig = async (
  configService: ConfigService,
): Promise<SequelizeModuleOptions> => ({
  dialect: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DB'),
  autoLoadModels: true,
  models: [
    Anime,
    MaterialData,
    User,
    Viewed,
    ViewedAnime,
    Favourite,
    FavouriteAnime,
    Genre,
    GenreAnime,
    HomeSlider,
  ],
});
