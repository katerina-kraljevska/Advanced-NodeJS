import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';

@Entity()
export class Director {
  @PrimaryGeneratedColumn('uuid', { name: 'director_id' })
  id: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'birth_year' })
  birthYear: number;

  @OneToMany(() => Movie, (movie) => movie.director)
  movies: Movie[];
}
