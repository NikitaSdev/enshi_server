import { Module } from '@nestjs/common';
import { AnimeSchedule } from './anime.schedule';
import { Anime } from '../anime.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnimeService } from '../anime.service';

@Module({
  imports: [SequelizeModule.forFeature([Anime])],
  providers: [AnimeSchedule, AnimeService],
  controllers: [],
})
export class AnimeScheduleModule {}
