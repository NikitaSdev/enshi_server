import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Anime } from './anime.model';
import { AnimeService } from './anime.service';
import { AnimeController } from './anime.controller';

@Module({
  providers: [AnimeService],
  controllers: [AnimeController],
  imports: [SequelizeModule.forFeature([Anime])],
})
export class AnimeModule {}
