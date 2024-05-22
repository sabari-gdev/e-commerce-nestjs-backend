import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const userExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (userExists) throw new BadRequestException('User already exists!');

    createUserDto.password = await hash(createUserDto.password, 10);

    const user = this.userRepository.create(createUserDto);

    return await this.userRepository.save(user);
  }

  async login(userLoginDto: UserLoginDto): Promise<User> {
    const userExists = await this.userRepository.findOneBy({
      email: userLoginDto.email,
    });

    if (userExists == null) {
      throw new BadRequestException(
        'User not found! Please create an account.',
      );
    }

    if (!(await compare(userLoginDto.password, userExists.password))) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return userExists;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  generateAccessToken(user: User) {
    const payload = { userId: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }
}
