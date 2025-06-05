import { IsArray, IsNumber, IsString, Length, Min } from 'class-validator';
import { Movie } from 'src/movies/entities/movie.entity';

export class CreateDirectorDto {
  @IsString()
  @Length(3, 30)
  fullName: string;

  @IsNumber()
  @Min(1900)
  birthYear: number;

  // @IsArray()
  // @IsString({ each: true })
  // movies: Movie[];
}
