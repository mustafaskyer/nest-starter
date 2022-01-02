import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserDto } from 'src/user/dtos/auth-user-dto';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.signUp(createUserDto)
    }

    @Post('/signin')
    async signin(@Body() authUserDto: AuthUserDto): Promise<{ token: string }> {
        return this.authService.signIn(authUserDto)
    }
}
