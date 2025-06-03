import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoomBookingDto } from './createRoomBooking.dto';

export class UpdateRoomBooking extends PartialType(CreateRoomBookingDto) {}
