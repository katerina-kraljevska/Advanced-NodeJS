// import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MoviesModule } from './movies/movies.module';
// import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from './database/database.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Movie } from './movies/entities/movie.entity';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       envFilePath: '.env',
//       isGlobal: true,
//     }),
//     DatabaseModule,
//     MoviesModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

//tuka nesto ne sakase da mi funkcionira pa go napisav na drgiot nacin
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Movie } from './movies/entities/movie.entity';
import { MoviesModule } from './movies/movies.module';

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
      entities: [Movie],
      synchronize: true,
    }),
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
