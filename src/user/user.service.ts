import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({ _id: userId }, {});
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getUserByEmail({ email });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(createUserDto.password, salt);
      const res = await this.userRepository.create({
        ...createUserDto,
        password,
      });
      return res;
    } catch (error) {
      if (error.code === 11000) {
        // duplicate key error collection
        throw new HttpException(
          `#${error.code} duplicate key error collection ${JSON.stringify(
            error?.keyValue,
          )}`,
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException('UNKNOW ERROR', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateUser(id, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update({ _id: id }, updateUserDto);
  }
}
