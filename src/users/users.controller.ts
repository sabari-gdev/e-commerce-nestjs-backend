import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const user = await this.usersService.login(userLoginDto);
    const accessToken = this.usersService.generateAccessToken(user);

    return {
      accessToken: accessToken,
      data: user,
    };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return {
      status: true,
      message: 'Successfully fetched all users!',
      data: users,
    };
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.findOne(id);

    return {
      status: true,
      message: 'User found',
      data: {
        user,
      },
    };
  }

  @Patch(':id')
  async updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
