import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { Director } from 'src/director/entities/director.entity';
import { Actor } from 'src/actor/entities/actor.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Director, Actor, User])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
