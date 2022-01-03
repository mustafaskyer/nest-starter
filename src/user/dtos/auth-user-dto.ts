import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}
