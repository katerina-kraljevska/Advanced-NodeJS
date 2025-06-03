import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'node:path';
import { RoomBookingFilters } from './interfaces/rooms.interface';
import { readFile, writeFile } from 'node:fs/promises';
import { v4 as uuid } from 'uuid';
import { UpdateRoomBooking } from './dtos/updateRoomBooking.dto';
import { CreateRoomBookingDto } from './dtos/createRoomBooking.dto';
import { RoomBookingDto } from './dtos/roomBooking.dto';

@Injectable()
export class RoomsService {
  private ROOMS_PATH = join(
    process.cwd(),
    'src',
    'rooms',
    'data',
    'roomBookings.json',
  );
  async getAllRooms(filters?: RoomBookingFilters) {
    const roomsJSON = await readFile(this.ROOMS_PATH, 'utf-8');

    let rooms = JSON.parse(roomsJSON) as RoomBookingDto[];

    if (filters?.roomNumber) {
      rooms = rooms.filter((room) => room.roomNumber === filters.roomNumber);
    }

    if (filters?.type) {
      rooms = rooms.filter((room) => room.type === filters.type);
    }

    if (filters?.isAvaliable !== undefined) {
      rooms = rooms.filter((room) => room.isAvaliable === filters.isAvaliable);
    }

    if (filters?.minPrice) {
      rooms = rooms.filter(
        (room) => room.price >= (filters.minPrice as number),
      );
    }

    if (filters?.maxPrice) {
      rooms = rooms.filter(
        (room) => room.price <= (filters.maxPrice as number),
      );
    }
    return rooms;
  }

  async getRoomById(id: string) {
    const rooms = await this.getAllRooms();

    const foundRoom = rooms.find((room) => room.id === id);

    if (!foundRoom) throw new NotFoundException('Room not found');

    return foundRoom;
  }

  async saveRooms(rooms: RoomBookingDto[]) {
    await writeFile(this.ROOMS_PATH, JSON.stringify(rooms, null, 2), 'utf-8');
  }

  async createRoom(roomData: CreateRoomBookingDto) {
    const rooms = await this.getAllRooms();

    const newRoom: RoomBookingDto = {
      ...roomData,
      id: uuid(),
    };

    rooms.push(newRoom);

    await this.saveRooms(rooms);

    return newRoom;
  }

  async updateRoom(roomId: string, updateData: UpdateRoomBooking) {
    const rooms = await this.getAllRooms();

    const roomExists = rooms.some((room) => room.id === roomId);

    if (!roomExists) throw new NotFoundException('Room not found');

    const updatedRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, ...updateData } : room,
    );

    await this.saveRooms(updatedRooms);
  }

  async deleteRooms(id: string) {
    const rooms = await this.getAllRooms();

    const updatedRooms = rooms.filter((room) => room.id !== id);

    if (updatedRooms.length === rooms.length)
      throw new NotFoundException('room not found');

    await this.saveRooms(updatedRooms);
  }
}
