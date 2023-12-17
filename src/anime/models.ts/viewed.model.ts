import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';
import { Anime } from './anime.model';

@Table({ tableName: 'Viewed' })
export class Viewed extends Model<Viewed> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
  @BelongsTo(() => User)
  user: User;
  @HasMany(() => ViewedAnime)
  viewedAnime: ViewedAnime[];
}

@Table({ tableName: 'ViewedAnime' })
export class ViewedAnime extends Model<ViewedAnime> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => Viewed)
  @Column({ type: DataType.INTEGER })
  viewed_id: number;
  @BelongsTo(() => Viewed)
  viewed: Viewed;
  @ForeignKey(() => Anime)
  @Column({ type: DataType.INTEGER })
  anime_Id: number;
  @BelongsTo(() => Anime)
  anime: Anime;
  createdAt: Date;
  updatedAt: Date;
}
