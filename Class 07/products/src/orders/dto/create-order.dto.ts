import { IsDateString, Min, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsDateString()
  date: string;

  @IsString()
  userId: string;
}
