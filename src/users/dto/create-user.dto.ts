import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserLoginDto } from './user-login.dto';

export class CreateUserDto extends UserLoginDto {
  @IsNotEmpty({ message: 'Please enter a name!' })
  @IsString({ message: 'Name should be a string!' })
  name: string;
}
