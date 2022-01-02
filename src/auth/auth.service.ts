import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from 'src/user/dtos/auth-user-dto';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './dtos/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  async signIn(authUserDto: AuthUserDto): Promise<{ token: string }> {
    const user = await this.userService.getUserByEmail(authUserDto.email);
    if (!user) {
      throw new NotFoundException(`User not exist`);
    }

    if (user && (await bcrypt.compare(authUserDto.password, user.password))) {
      const { email, username } = user;
      const payload: JwtPayload = { email, username };
      const accessToken = await this.jwtService.sign(payload);
      return { token: accessToken };
    } else {
      throw new UnauthorizedException('Credential Errors');
    }
  }

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      return null;
    }

    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string): Promise<User> {
    const decode = this.jwtService.verify(token, {
      secret: process.env.ACCESS_TOKEN,
    });

    const user = this.userService.getUserByEmail(decode.email);
    if (!user) {
      throw new NotFoundException(`User not exist`);
    }

    return user;
  }
}
