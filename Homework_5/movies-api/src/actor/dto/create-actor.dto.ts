import {
  IsUUID,
  IsArray,
  IsString,
  Min,
  Length,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { RoleType } from 'src/roles/roles.model';

export class CreateActorDto {
  @IsString()
  @Length(3, 30)
  fullName: string;

  @IsNumber()
  @Min(1900)
  birthYear: number;

  @IsArray()
  @IsUUID('4', { each: true })
  movies: string[];
}
