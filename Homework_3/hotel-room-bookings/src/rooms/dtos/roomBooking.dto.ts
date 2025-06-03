import { CreateRoomBookingDto } from './createRoomBooking.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RoomBookingDto extends CreateRoomBookingDto {
  @ApiProperty({
    description: 'Room Booking id, a valid v4 uuid',
    example: '837d7ef5-383c-4b47-9be7-09a9e0612466',
  })
  id: string;
}
