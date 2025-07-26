import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
    @IsString( { message: 'First name must be a string' })
    firstName: string;
    @IsString( { message: 'Last name must be a string' })
    lastName: string;
    @IsEmail({} ,{ message: 'Email must be a valid email address' })
    @IsString( { message: 'Email must be a string' })
    email: string;
}
