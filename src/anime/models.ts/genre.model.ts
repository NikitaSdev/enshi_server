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

@Table({ tableName: 'Genre' })
export class Genre extends Model<Genre> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @Index('genre-title-index')
  @Column({ type: DataType.STRING })
  title: string;
  @Column({ type: DataType.INTEGER })
  count: number;
  @BelongsToMany(() => Anime, () => GenreAnime)
  anime: GenreAnime[];
}

@Table({ tableName: 'GenreAnime' })
export class GenreAnime extends Model<GenreAnime> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => Genre)
  @Column({ type: DataType.INTEGER })
  public genre_id: number;

  @ForeignKey(() => Anime)
  @Column({ type: DataType.INTEGER })
  public anime_id: number;
}
