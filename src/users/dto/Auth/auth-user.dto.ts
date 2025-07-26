import { IsEmail, IsString, IsStrongPassword } from "class-validator";


export class SignUpDto {
  @IsString({ message: 'First name must be a string' })
  firstName: string;

  @IsString({ message: 'Last name must be a string' })
  lastName: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  }, { message: 'Password must be at least 8 characters long, contain at least 1 number and 1 lowercase' })
  password: string;
}

export class SignInDto {
  @IsEmail({}, { message: 'Email required' })
  email: string;
@IsString({message:'Password required'})
  password: string;
}
