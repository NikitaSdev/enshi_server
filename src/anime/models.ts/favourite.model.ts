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

@Table({ tableName: 'Favourite' })
export class Favourite extends Model<Favourite> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
  @BelongsTo(() => User)
  user: User;
  @HasMany(() => FavouriteAnime)
  favouriteAnime: FavouriteAnime[];
}

@Table({ tableName: 'FavouriteAnime' })
export class FavouriteAnime extends Model<FavouriteAnime> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => Favourite)
  @Column({ type: DataType.INTEGER })
  favourite_id: number;
  @ForeignKey(() => Anime)
  @Column({ type: DataType.INTEGER })
  anime_Id: number;
  createdAt: Date;
  updatedAt: Date;
  @BelongsTo(() => Anime)
  anime: Anime;
  @BelongsTo(() => Favourite)
  favourite: Favourite;
}
