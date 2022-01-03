import { IsEmail, IsLowercase, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    name: string;

    @IsString()
    @MinLength(8)
    @IsLowercase()
    username: string;

    @IsEmail()
    @MaxLength(111)
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(100)
    password: string;
}
