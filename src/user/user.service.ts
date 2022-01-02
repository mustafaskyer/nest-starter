import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(userId: string): Promise<User> {
    return this.userRepository.findOne({ _id: userId });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find({});
  }

  async createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.create(user);
  }

  async updateUser(id, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.update({ _id: id }, updateUserDto);
  }
}
