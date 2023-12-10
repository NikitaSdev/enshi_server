import {
  Model,
  Column,
  Table,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
  Index,
  HasOne,
} from 'sequelize-typescript';

@Table({ tableName: 'Anime' })
export class Anime extends Model<Anime> {
  @Column({ type: DataType.BIGINT, primaryKey: true, autoIncrement: true })
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

  @Column({ type: DataType.STRING, allowNull: true })
  other_title: string;

  @Column({ type: DataType.JSONB, allowNull: true })
  translation: { id: number; title: string; type: string };

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

  @HasMany(() => Season)
  seasons: Season[];

  @Column({ type: DataType.JSONB, allowNull: true })
  material_data: {
    title: string;
    anime_title: string;
    title_en: string;
    other_titles: string[];
    other_titles_en: string[];
    other_titles_jp: string[];
    anime_kind: string;
    all_status: string;
    anime_status: string;
    year: number;
    description: string;
    poster_url: string;
    screenshots: string[];
    duration: number;
    countries: string[];
    all_genres: string[];
    genres: string[];
    anime_genres: string[];
    anime_studios: string[];
    kinopoisk_rating: number;
    kinopoisk_votes: number;
    imdb_rating: number;
    imdb_votes: number;
    shikimori_rating: number;
    shikimori_votes: number;
    premiere_world: string;
    aired_at: Date;
    next_episode_at: Date;
    rating_mpaa: string;
    episodes_total: number;
    episodes_aired: number;
    actors: string[];
    directors: string[];
    producers: string[];
    writers: string[];
    composers: string[];
    editors: string[];
    designers: string[];
    operators: string[];
  };
}

@Table({ tableName: 'Season' })
export class Season extends Model<Season> {
  @ForeignKey(() => Anime)
  @Column({ type: DataType.BIGINT })
  animeId: number;

  @Column({ type: DataType.STRING })
  link: string;

  @BelongsTo(() => Anime)
  anime: Anime;

  @HasMany(() => Episode)
  episodes: Episode[];
}

@Table({ tableName: 'Episode' })
export class Episode extends Model<Episode> {
  @ForeignKey(() => Season)
  @Column({ type: DataType.BIGINT })
  seasonId: number;

  @BelongsTo(() => Season)
  season: Season;

  @Column
  link: string;
}
