import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-users.dto';
import { Users } from './users.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {
  async createUser(user: CreateUserDto): Promise<Users> {
    const { email, name, password } = user;

    const newUser = this.create();
    newUser.email = email;
    newUser.name = name;
    newUser.password = bcrypt.hash(password, bcrypt.genSalt());
    try {
      await newUser.save();
      delete newUser.password;
      return newUser;
    } catch (err) {
      if (err.code.toString === '23505')
        throw new ConflictException(`This e-email ${newUser.email} is used`);
      throw new InternalServerErrorException('Error to save in database');
    }
  }
}
