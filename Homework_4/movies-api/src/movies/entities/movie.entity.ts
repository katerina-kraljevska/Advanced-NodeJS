import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { Genre } from '../enum/enum';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'release_year', type: 'int' })
  release_year: number;

  @Column({
    type: 'enum',
    enum: Genre,
  })
  genre: Genre;

  @Column({ name: 'duration_min', type: 'int' })
  duration: number;

  @Column({ name: 'rating', type: 'float' })
  rating: number;

  @Column({ name: 'poster_url', nullable: true })
  poster_url?: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
