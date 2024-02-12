import { Controller, Post } from '@nestjs/common';
import { AnimeService } from './anime.service';

@Controller('anime')
export class AnimeController {
  constructor(private readonly animeService: AnimeService) {}

  // @Post()
  // public async parseAnime() {
  //   await this.animeService.parseAnime();
  // }
}
