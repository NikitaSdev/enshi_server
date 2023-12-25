import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';
import { MaterialData } from './models.ts/material-data.model';
import { Anime } from './models.ts/anime.model';
import { User } from './models.ts/user.model';
import { Viewed, ViewedAnime } from './models.ts/viewed.model';
import { Favourite, FavouriteAnime } from './models.ts/favourite.model';
import { Genre, GenreAnime, _AnimeToGenre } from './models.ts/genre.model';

@Module({
  providers: [AnimeService],
  controllers: [AnimeController],
  imports: [
    SequelizeModule.forFeature([
      Anime,
      MaterialData,
      User,
      Viewed,
      ViewedAnime,
      Favourite,
      FavouriteAnime,
      GenreAnime,
      Genre,
      _AnimeToGenre,
    ]),
  ],
})
export class AnimeModule {}
