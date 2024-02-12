import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

import { Anime } from './anime.model';

@Table({ tableName: 'GenreAnime' })
export class GenreAnime extends Model<GenreAnime> {
  @ForeignKey(() => Genre)
  @Column({ type: DataType.INTEGER })
  public genre_id: number;

  @ForeignKey(() => Anime)
  @Column({ type: DataType.INTEGER })
  public anime_id: number;
}

@Table({ tableName: '_AnimeToGenre' })
export class _AnimeToGenre extends Model<_AnimeToGenre> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.INTEGER })
  public B: number;

  @Column({ type: DataType.INTEGER })
  public A: number;
}

@Table({ tableName: 'Genre' })
export class Genre extends Model<Genre> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  public id: number;
  @Index('genre-title-index')
  @Column({ type: DataType.STRING })
  public title: string;
  @Column({ type: DataType.INTEGER })
  public count: number;
  @BelongsToMany(() => Anime, () => GenreAnime)
  public anime: Anime[];
}
