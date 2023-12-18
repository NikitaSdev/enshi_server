import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';

import { MaterialData } from './material-data.model';
import { FavouriteAnime } from './favourite.model';
import { ViewedAnime } from './viewed.model';
import { Genre, GenreAnime } from './genre.model';

@Table({ tableName: 'Anime' })
export class Anime extends Model<Anime> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  anime_id: number;

  @Index('anime_id_index')
  @Column({ type: DataType.STRING })
  id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  type: string;

  @Column({ type: DataType.STRING, allowNull: false })
  link: string;

  @Index('anime_title_index')
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  title_orig: string;

  @Index('anime_other_index')
  @Column({ type: DataType.STRING, allowNull: true })
  other_title: string;

  @Column({ type: DataType.JSONB, allowNull: true })
  translation: { id: number; title: string; type: string };

  @Index('anime_year_index')
  @Column({ type: DataType.INTEGER, allowNull: true })
  year: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  last_season: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  last_episode: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  episodes_count: number;

  @Column({ type: DataType.STRING, allowNull: true })
  kinopoisk_id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  imdb_id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  worldart_link: string;

  @Column({ type: DataType.STRING, allowNull: true })
  shikimori_id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  quality: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  camrip: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  lgbt: boolean;

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  blocked_countries: string[];

  @Column({ type: DataType.JSONB, allowNull: true })
  blocked_seasons: { [season: string]: boolean };

  created_at: Date;
  updated_at: Date;

  @Column({ type: DataType.JSONB, allowNull: true })
  seasons: {
    [season_key: string]: {
      link: string;
      episodes: {
        [episode_key: string]: string;
      };
    };
  };

  @HasOne(() => MaterialData)
  material_data: MaterialData;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  blocked: boolean;

  @Column({ type: DataType.FLOAT, allowNull: true })
  rating: number;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  top: boolean;

  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: -1 })
  top_order: number;

  @Column({ type: DataType.BOOLEAN, allowNull: true, defaultValue: false })
  popular: boolean;

  @Column({ type: DataType.INTEGER, allowNull: true, defaultValue: -1 })
  popular_order: number;

  @HasMany(() => FavouriteAnime)
  favouriteAnime: FavouriteAnime[];

  @HasMany(() => ViewedAnime)
  viewedAnime: ViewedAnime[];

  @BelongsToMany(() => Genre, () => GenreAnime)
  genres: Genre[];
}
