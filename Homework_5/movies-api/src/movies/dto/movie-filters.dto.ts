import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Genre } from '../enum/enum';

export class MovieFiltersDto {
  @IsOptional()
  @IsEnum(Genre)
  genre?: Genre;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(10)
  minRating?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxDuration?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  sortBy?: 'release_year' | 'rating' | 'duration';

  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC';
}
