import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsDateString,
  Length,
} from 'class-validator';

export class RoomBookingDetailsDto {
  @ApiProperty({
    description: 'Array of amentites',
    example: ['TV', 'Wi-fi'],
    type: 'array',
  })
  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @ApiProperty({
    description: 'Maximum occupancy',
    examples: [1, 2, 3, 4, 5],
    type: 'integer',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  maxOccupancy: number;

  @ApiProperty({
    description: 'When was the room last cleaned',
    example: '2025-06-01',
    type: 'string',
    format: 'date',
  })
  @IsDateString()
  lastCleaned: string;

  @ApiProperty({
    description: 'Maintance notes',
    type: 'string',
    example: 'The room was maintained by...',
  })
  @IsOptional()
  @IsString()
  @Length(3, 300)
  maintenanceNotes: string;
}
