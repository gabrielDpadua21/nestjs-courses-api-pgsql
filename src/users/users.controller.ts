import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto';
import { ReturnUserDto } from './dtos/return-users.dto';
import { UsersService } from './users.service';
import { CreateCoursesDto } from '../courses/dtos/create-courses.dto';
import { CreateInternalUserDto } from './dtos/create-internal-user.dto';
import { Users } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReturnUserDto> {
    const user = await this.usersService.create(createUserDto);
    return {
      user,
      message: 'Success',
    };
  }

  @Post('/internal')
  async createInternal(
    @Body() createInternalUserDto: CreateInternalUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createInternal(createInternalUserDto);
    return {
      user,
      message: 'Success',
    };
  }

  @Get()
  async list(): Promise<Users[]> {
    const users = await this.usersService.findAll();
    return users;
  }
}
