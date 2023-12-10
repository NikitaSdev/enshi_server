import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AnimeService } from '../anime.service';

@Injectable()
export class AnimeSchedule {
  constructor(private animeService: AnimeService) {}
  @Cron('32 3 * * *')
  async parseAnime() {
    await this.animeService.parseAnime();
  }
}
