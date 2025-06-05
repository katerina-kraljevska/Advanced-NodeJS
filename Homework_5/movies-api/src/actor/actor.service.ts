import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { v4 as uuid } from 'uuid';
import { Actor } from './entities/actor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from 'src/movies/entities/movie.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor) private actorRepo: Repository<Actor>,
    @InjectRepository(Movie) private movieRepo: Repository<Movie>,
  ) {}
  async create(createActorDto: CreateActorDto) {
    const movies = await this.movieRepo.findByIds(createActorDto.movies);

    const actor = this.actorRepo.create({
      ...createActorDto,
      movies,
    });

    return this.actorRepo.save(actor);
  }

  async findAll() {
    return await this.actorRepo.find();
  }

  async findOne(id: string) {
    const foundActor = await this.actorRepo.findOneBy({ id });

    if (!foundActor) throw new NotFoundException('actor nt found');

    return foundActor;
  }

  async update(id: string, updateActorDto: UpdateActorDto) {
    const foundActor = await this.findOne(id);

    Object.assign(foundActor, updateActorDto);

    await this.actorRepo.save(foundActor);
  }

  async remove(id: string) {
    const foundActor = await this.findOne(id);

    await this.actorRepo.remove(foundActor);
  }
}
