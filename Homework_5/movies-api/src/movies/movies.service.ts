import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { MovieFiltersDto } from './dto/movie-filters.dto';
import { v4 as uuid } from 'uuid';
import { Director } from 'src/director/entities/director.entity';
import { In } from 'typeorm';
import { Actor } from 'src/actor/entities/actor.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
    @InjectRepository(Director) private directorRepo: Repository<Director>,
    @InjectRepository(Actor) private actorRepo: Repository<Actor>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const { directorId, actorsIds, usersIds, ...movieData } = createMovieDto;

    const director = await this.directorRepo.findOneBy({
      id: createMovieDto.directorId,
    });

    if (!director) {
      throw new NotFoundException('Director not found');
    }

    const movieActors = await this.actorRepo.findBy({
      id: In(createMovieDto.actorsIds),
    });

    if (!movieActors) {
      throw new NotFoundException('Actors not found');
    }

    const users = await this.userRepo.findBy({
      id: In(createMovieDto.usersIds),
    });

    createMovieDto.created_at = new Date();
    const newMovie = {
      id: uuid(),
      ...movieData,
      director,
      movieActors,
      users,
    };
    return this.movieRepo.save(newMovie);
  }

  async findAll(query: MovieFiltersDto): Promise<Movie[]> {
    const queryFilter = this.movieRepo.createQueryBuilder('movie');

    if (query.genre) {
      queryFilter.andWhere('movie.genre=:genre', { genre: query.genre });
    }

    if (query.minRating !== undefined) {
      queryFilter.andWhere('movie.rating >= :minRating', {
        minRating: query.minRating,
      });
    }

    if (query.maxDuration !== undefined) {
      queryFilter.andWhere('movie.duration <= :maxDuration', {
        maxDuration: query.maxDuration,
      });
    }

    if (query.title) {
      queryFilter.andWhere('LOWER(movie.title) ILIKE LOWER(:title)', {
        title: `%${query.title}%`,
      });
    }

    const sortBy = query.sortBy || 'release_year';
    const sortOrder = query.sortOrder || 'DESC';
    queryFilter.orderBy(
      `movie.${sortBy}`,
      sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
    );

    return queryFilter.getMany();
  }

  async findById(id: string) {
    const foundMovie = await this.movieRepo.findOneBy({ id });

    if (!foundMovie) throw new NotFoundException('Movie not found');

    return foundMovie;
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const foundMovie = await this.findById(id);

    Object.assign(foundMovie, updateMovieDto);

    updateMovieDto.updated_at = new Date();

    console.log(foundMovie);

    await this.movieRepo.save(foundMovie);
  }

  async remove(id: string) {
    const foundMovie = await this.findById(id);

    await this.movieRepo.remove(foundMovie);
  }
}
