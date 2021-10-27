import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-users.dto';
import { Users } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    if (createUserDto.password !== createUserDto.passwordConfirm)
      throw new UnprocessableEntityException('Passwords not equals');
    return this.usersRepository.createUser(createUserDto);
  }
}
