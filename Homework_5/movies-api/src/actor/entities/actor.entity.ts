import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn('uuid', { name: 'actor_id' })
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'birth_year' })
  birthYear: number;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[];
}
