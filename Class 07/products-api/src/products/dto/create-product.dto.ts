import {
  IsBoolean,
  IsString,
  Length,
  IsInt,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 60)
  title: string;

  @IsInt()
  @Min(0)
  stock: number;

  @IsNumber()
  @Min(1)
  price: number;

  @IsBoolean()
  isAvaliable: boolean;
}
