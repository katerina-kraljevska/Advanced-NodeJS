import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DirectorModule } from './director/director.module';
import { ActorModule } from './actor/actor.module';
import { Director } from './director/entities/director.entity';
import { Movie } from './movies/entities/movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actor/entities/actor.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Movie, Director, User, Actor],
      synchronize: true,
      logging: ['query', 'error', 'schema'],
    }),
    ActorModule,
    AuthModule,
    UsersModule,
    DirectorModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
