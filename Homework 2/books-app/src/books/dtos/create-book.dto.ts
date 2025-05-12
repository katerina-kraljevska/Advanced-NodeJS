import { IsBoolean, IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @Length(3, 300)
  title: string;

  @IsString()
  @Length(3, 300)
  author: string;

  @IsString()
  @Length(3, 300)
  genre: string;

  @IsString()
  @Length(3, 300)
  publisher: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(10)
  pages: number;

  @IsBoolean()
  isInStock: boolean;
}
