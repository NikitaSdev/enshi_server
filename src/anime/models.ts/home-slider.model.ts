import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'HomeSlider' })
export class HomeSlider extends Model<HomeSlider> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @Column({ type: DataType.STRING })
  image_url: string;
  @Column({ type: DataType.STRING })
  preview_image_url: string;
  @Column({ type: DataType.INTEGER })
  season: number;
  @Column({ type: DataType.INTEGER })
  rating: number;
  @Column({ type: DataType.STRING })
  title: string;
  @Column({ type: DataType.STRING })
  description: string;
  createdAt: Date;
  updatedAt: Date;
  @Column({ type: DataType.INTEGER })
  order: number;
  @Column({ type: DataType.INTEGER })
  anime_id: number;
}
