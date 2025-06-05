import {
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
  Length,
  Min,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { RoleType } from 'src/roles/roles.model';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 30)
  password: string;

  @IsString()
  @Length(3, 30)
  firstName: string;

  @IsString()
  @Length(3, 30)
  lastName: string;

  @IsNumber()
  @Min(16)
  age: number;

  @IsEnum(RoleType)
  role: RoleType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  movies: string[];
}
