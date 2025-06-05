import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty({
    description: 'Date when the movie was updated',
    example: '2025-03-03',
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}
