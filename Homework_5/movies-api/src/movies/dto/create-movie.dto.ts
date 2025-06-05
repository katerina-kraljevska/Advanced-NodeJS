import {
  IsInt,
  IsDate,
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  Length,
  Min,
  Max,
  IsUUID,
  IsArray,
} from 'class-validator';
import { Genre } from '../enum/enum';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Movie title',
    type: 'string',
    minLength: 3,
    maxLength: 30,
    examples: ['Oppenheimer', 'Titanic'],
  })
  @IsString()
  @Length(3, 30)
  title: string;

  @ApiProperty({
    description: 'Movie description',
    type: 'string',
    minLength: 3,
    maxLength: 300,
    examples: [
      'It follows the life of J. Robert Oppenheimer, the American theoretical physicist who helped develop the first nuclear weapons during World War II.',
    ],
  })
  @IsString()
  @Length(3, 300)
  description: string;

  @ApiProperty({
    description: 'Release year',
    minimum: 1900,
    type: 'integer',
    examples: [1999, 2002],
  })
  @IsInt()
  @Min(1900)
  release_year: number;

  @ApiProperty({
    description: 'Genre',
    examples: ['action', 'comedy', 'drama'],
  })
  @IsEnum(Genre)
  genre: Genre;

  @ApiProperty({
    description: 'director id',
    type: 'string',
    examples: ['80783dda-04d4-42a3-81e5-5fb0060aaac9'],
  })
  @IsUUID()
  directorId: string;

  @ApiProperty({
    description: 'actors ids',
    type: 'string',
    examples: ['80783dda-04d4-42a3-81e5-5fb0060aaac9'],
  })
  @IsUUID('all', { each: true })
  @IsArray()
  actorsIds: string[];

  @ApiProperty({
    description: 'users ids',
    type: 'string',
    examples: ['80783dda-04d4-42a3-81e5-5fb0060aaac9'],
  })
  @IsUUID('all', { each: true })
  @IsArray()
  usersIds: string[];

  @ApiProperty({
    description: 'Duration in minutes',
    minimum: 0,
    type: 'number',
    examples: [120, 92],
  })
  @IsNumber()
  @Min(0)
  duration: number;

  @ApiProperty({
    description: 'Rating',
    minimum: 0,
    type: 'number',
    examples: [5.5, 9.9],
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;

  @ApiProperty({
    description: 'Poster_url',
    minimum: 3,
    maximum: 300,
    type: 'string',
    example:
      'https://www.imdb.com/title/tt15398776/mediaviewer/rm2670601217/?ref_=tt_ov_i',
  })
  @IsOptional()
  @IsString()
  @Length(3, 300)
  poster_url: string;

  @ApiProperty({
    description: 'Date when the movie was creted',
    example: '2025-03-03',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  created_at?: Date;
}
