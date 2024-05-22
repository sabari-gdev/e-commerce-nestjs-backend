import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty({ message: 'Email should not be empty!' })
  @IsEmail({}, { message: 'Please enter a valid email!' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty!' })
  @MinLength(8, { message: 'Password should contain at least 8 characters' })
  password: string;
}
