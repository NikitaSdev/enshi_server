import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

import { Anime } from './anime.model';

@Table({ tableName: 'MaterialData' })
export class MaterialData extends Model<MaterialData> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Anime)
  @Column({ type: DataType.INTEGER })
  anime_id: number;

  @BelongsTo(() => Anime)
  anime: Anime;

  @Column({ type: DataType.STRING, allowNull: true })
  title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  anime_title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  title_en: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  other_titles: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  other_titles_en: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  other_titles_jp: string[];

  @Column({ type: DataType.STRING, allowNull: true })
  anime_kind: string;

  @Column({ type: DataType.STRING, allowNull: true })
  all_status: string;

  @Index('material_data_status_index')
  @Column({ type: DataType.STRING, allowNull: true })
  anime_status: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  year: number;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  poster_url: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  screenshots: string[];

  @Column({ type: DataType.INTEGER, allowNull: true })
  duration: number;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  countries: string[];

  @Index('material_data_genres_index')
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  all_genres: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  genres: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  anime_genres: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  anime_studios: string[];

  @Column({ type: DataType.FLOAT, allowNull: true })
  kinopoisk_rating: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  kinopoisk_votes: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  imdb_rating: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  imdb_votes: number;

  @Column({ type: DataType.FLOAT, allowNull: true })
  shikimori_rating: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  shikimori_votes: number;

  @Column({ type: DataType.STRING, allowNull: true })
  premiere_world: string;

  @Column({ type: DataType.DATE, allowNull: true })
  aired_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  next_episode_at: Date;

  @Column({ type: DataType.STRING, allowNull: true })
  rating_mpaa: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  episodes_total: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  episodes_aired: number;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  actors: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  directors: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  producers: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  writers: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  composers: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  editors: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  designers: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  operators: string[];
}
