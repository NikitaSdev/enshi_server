import { Module } from '@nestjs/common';
import { AnimeSchedule } from './anime.schedule';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnimeService } from '../anime.service';
import { Anime } from '../models.ts/anime.model';
import { MaterialData } from '../models.ts/material-data.model';
import { Genre, GenreAnime } from '../models.ts/genre.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Anime, MaterialData, Genre, GenreAnime]),
  ],
  providers: [AnimeSchedule, AnimeService],
  controllers: [],
})
export class AnimeScheduleModule {}
