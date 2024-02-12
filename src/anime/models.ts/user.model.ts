import {
  Column,
  DataType,
  HasOne,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Favourite } from './favourite.model';
import { Viewed } from './viewed.model';

@Table({ tableName: 'User' })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @Index('user_email_index')
  @Column({ type: DataType.STRING, unique: true })
  email: string;
  @Column({ type: DataType.STRING })
  password: string;
  @Index('user_login_index')
  @Column({ type: DataType.STRING, unique: true })
  login: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '/uploads/avatars/default.jpg',
  })
  avatar_url: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: '/uploads/wallpapers/default.jpg',
  })
  wallpaper_url: string;
  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: 0 })
  minutes_watched: number;
  createdAt: Date;
  updatedAt: Date;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  admin: boolean;
  @HasOne(() => Favourite)
  favourite: Favourite;
  @HasOne(() => Viewed)
  viewed: Viewed;
}
