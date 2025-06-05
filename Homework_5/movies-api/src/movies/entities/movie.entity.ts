import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Genre } from '../enum/enum';
import { Director } from '../../director/entities/director.entity';
import { ManyToOne, JoinColumn } from 'typeorm';
import { Actor } from '../../actor/entities/actor.entity';
import { User } from 'src/users/entities/user.entity';

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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  //relations
  @ManyToOne(() => Director, (director) => director.movies)
  @JoinColumn({ name: 'directorId' })
  director: Director;

  @ManyToMany(() => Actor, (actor) => actor.movies)
  @JoinTable({
    name: 'movie_actor',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'actor_id',
      referencedColumnName: 'id',
    },
  })
  actors: Actor[];

  //relations
  @ManyToOne(() => User, (user) => user.movies)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
