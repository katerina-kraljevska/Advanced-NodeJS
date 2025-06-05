import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from './entities/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(Director) private directorRepo: Repository<Director>,
  ) {}
  async create(createDirectorDto: CreateDirectorDto) {
    const newDirector = {
      id: uuid(),
      ...createDirectorDto,
    };
    return this.directorRepo.save(newDirector);
  }

  async findAll() {
    return await this.directorRepo.find();
  }

  async findOne(id: string) {
    const foundDirector = await this.directorRepo.findOneBy({ id });

    if (!foundDirector) throw new NotFoundException('director not found');

    return foundDirector;
  }

  async update(id: string, updateActorDto: UpdateDirectorDto) {
    const foundDirector = await this.findOne(id);

    Object.assign(foundDirector, updateActorDto);

    await this.directorRepo.save(foundDirector);
  }

  async remove(id: string) {
    const foundDirector = await this.findOne(id);

    await this.directorRepo.remove(foundDirector);
  }
}
