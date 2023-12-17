import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { postgresConfig } from './config/postgres.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { ScheduleModule } from '@nestjs/schedule';
import { AnimeScheduleModule } from './anime/schedule/anime.schedule.module';
import { AnimeModule } from './anime/anime.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: postgresConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
    AnimeModule,
    FileModule,
    AnimeScheduleModule,
  ],
  providers: [],
})
export class AppModule {}
