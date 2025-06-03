import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  Max,
  Min,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { RoomType } from '../interfaces/rooms.interface';
import { RoomBookingDetailsDto } from './roomBookingDetails.dto';

export class CreateRoomBookingDto {
  @ApiProperty({
    description: 'Room number',
    minimum: 1,
    maximum: 999,
    example: [1, 2, 3, 89, 999],
  })
  @IsNumber()
  @Min(1)
  @Max(999)
  roomNumber: number;

  @ApiProperty({
    description: 'Room type',
    enum: RoomType,
    examples: [],
  })
  @IsEnum(RoomType)
  type: RoomType;

  @ApiProperty({
    description: 'Price',
    examples: [100, 200],
  })
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({
    description: 'Is the room avalible',
    example: [true, false],
  })
  @IsBoolean()
  isAvaliable: boolean;

  @ApiProperty({ description: 'Room deatils object' })
  @IsObject()
  @ValidateNested()
  @Type(() => RoomBookingDetailsDto)
  details: RoomBookingDetailsDto;
}
