import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  @Length(3, 300)
  title?: string;

  @IsOptional()
  @IsString()
  @Length(3, 300)
  author?: string;

  @IsOptional()
  @IsString()
  @Length(3, 300)
  genre?: string;

  @IsOptional()
  @IsString()
  @Length(3, 300)
  publisher?: string;

  @IsOptional()
  @IsNumber()
  @Min(100)
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(10)
  pages?: number;

  @IsOptional()
  @IsBoolean()
  isInStock?: boolean;
}
