import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entites/users.entites';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

const DUBLICATE_PG_CODE = '23505';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  findAll() {
    return this.usersRepo.find();
  }

  async findById(id: string) {
    try {
      const foundUser = await this.usersRepo.findOneByOrFail({ id });

      return foundUser;
    } catch (error) {
      throw new NotFoundException('user not found');
    }
  }

  async findUserDetails(id: string) {
    const foundUser = await this.usersRepo.findOne({
      where: { id },
      relations: { userAddress: true, orders: true },
    });

    if (!foundUser) throw new NotFoundException('User not found');

    return foundUser;
  }

  async create(createData: CreateUserDto) {
    try {
      const newUser = await this.usersRepo.save(createData);
      return newUser;
    } catch (error) {
      if (error.code === DUBLICATE_PG_CODE)
        throw new BadRequestException('Email is taken');

      throw new InternalServerErrorException(error.message);
    }
  }

  async updateUser(id: string, updateData: UpdateUserDto) {
    try {
      const foundUser = await this.findById(id);

      Object.assign(foundUser, updateData);
    } catch (error) {
      if (error.code === DUBLICATE_PG_CODE)
        throw new BadRequestException('Email is already taken');

      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteUser(id: string) {
    const foundUser = await this.findById(id);

    await this.usersRepo.remove(foundUser);
  }
}
