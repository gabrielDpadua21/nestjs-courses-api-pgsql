import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-users.dto';
import { ReturnUserDto } from './dtos/return-users.dto';
import { UsersService } from './users.service';

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
}
