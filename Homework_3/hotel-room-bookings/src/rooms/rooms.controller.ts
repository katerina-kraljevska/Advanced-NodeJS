import {
  Controller,
  Param,
  Query,
  Post,
  Body,
  Delete,
  Patch,
  HttpCode,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiQuery,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { RoomBookingFilters, RoomType } from './interfaces/rooms.interface';
import { Get } from '@nestjs/common';
import { UpdateRoomBooking } from './dtos/updateRoomBooking.dto';
import { CreateRoomBookingDto } from './dtos/createRoomBooking.dto';
import { LoggerService } from 'src/logger/logger.service';
import { RoomBookingDto } from './dtos/roomBooking.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    private roomService: RoomsService,
    private loggerService: LoggerService,
  ) {}

  @Get()
  @ApiQuery({
    name: 'roomNumber',
    required: false,
  })
  @ApiQuery({
    name: 'type',
    required: false,
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
  })
  @ApiQuery({
    name: 'isAvalible',
    required: false,
  })
  @ApiOperation({ summary: 'endpoint that fetches all room booking' })
  @ApiOkResponse({
    type: RoomBookingDto,
    isArray: true,
  })
  @ApiInternalServerErrorResponse({
    description: "the server couldn't fetch the room bookings",
  })
  getAllRooms(
    @Query('roomNumber') roomNumber: string,
    @Query('type') typeString: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string,
    @Query('isAvaliable') isAvaliable: string,
  ) {
    console.log(roomNumber, typeString, minPrice, maxPrice, isAvaliable);

    const type = Object.values(RoomType).includes(typeString as RoomType)
      ? (typeString as RoomType)
      : undefined;

    const roomsFilters: RoomBookingFilters = {
      roomNumber: !Number.isNaN(roomNumber) ? Number(roomNumber) : null,
      type,
      minPrice: !Number.isNaN(minPrice) ? Number(minPrice) : null,
      maxPrice: !Number.isNaN(maxPrice) ? Number(maxPrice) : null,
      isAvaliable:
        isAvaliable === 'true'
          ? true
          : isAvaliable === 'false'
            ? false
            : undefined,
    };

    this.loggerService.addLog('room bookings fetched');

    return this.roomService.getAllRooms(roomsFilters);
  }

  @ApiOperation({ summary: 'endpoint that fetches room booking by id' })
  @ApiOkResponse({
    type: RoomBookingDto,
    isArray: false,
  })
  @ApiInternalServerErrorResponse({
    description: "the server couldn't fetch the room booking",
  })
  @Get(':id')
  getRoomsById(@Param('id') roomsId: string) {
    return this.roomService.getRoomById(roomsId);
  }

  @ApiOperation({ summary: 'endpoint that creates a room booking' })
  @ApiOkResponse({
    type: CreateRoomBookingDto,
    isArray: false,
  })
  @ApiInternalServerErrorResponse({
    description: "the server couldn't create the room booking",
  })
  @Post()
  createRoom(@Body() createData: CreateRoomBookingDto) {
    return this.roomService.createRoom(createData);
  }

  @ApiOperation({ summary: 'endpoint that updates a room booking by id' })
  @ApiOkResponse({
    type: UpdateRoomBooking,
  })
  @ApiInternalServerErrorResponse({
    description: "the server couldn't update the room booking",
  })
  @HttpCode(204)
  @Patch(':id')
  updateRoom(@Param('id') id: string, @Body() updateData: UpdateRoomBooking) {
    return this.roomService.updateRoom(id, updateData);
  }

  @ApiOperation({ summary: 'endpoint that deletes a room booking by id' })
  @ApiInternalServerErrorResponse({
    description: "the server couldn't delete the room booking",
  })
  @Delete(':id')
  async deleteRoom(@Param('id') id: string, @Res() res: Response) {
    await this.roomService.deleteRooms(id);

    res.sendStatus(204);
  }
}
