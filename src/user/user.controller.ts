import { Body, Controller, Get, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  private logger = new Logger('UsersController')
  constructor(private readonly userService: UserService) {}
  @Get(':id')
  async getUserId(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    this.logger.log('User is getting users')
    return this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.createUser(createUserDto)
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
      return this.userService.updateUser(id, updateUserDto)
  }
}
