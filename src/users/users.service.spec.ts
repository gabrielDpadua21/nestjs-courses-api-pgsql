import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-users.dto';

const mockUserRepository = () => ({
  createUser: jest.fn(),
});

describe('Users Test', () => {
  let usersRepository;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    service = await module.get<UsersService>(UsersService);
    usersRepository = await module.get<UsersRepository>(UsersRepository);
  });

  it('Service and repository user should be defined', () => {
    expect(service).toBeDefined();
    expect(UsersRepository).toBeDefined();
  });

  describe('User Test', () => {
    let mockCreateUserDto: CreateUserDto;

    beforeEach(() => {
      mockCreateUserDto = {
        email: 'mock@gmail.com',
        name: 'mock',
        password: 'asterix2108',
        passwordConfirm: 'asterix2108',
      };
    });

    it('Should create a user if password is equal', async () => {
      usersRepository.createUser.mockResolvedValue('mockUser');
      const user = await service.create(mockCreateUserDto);

      expect(usersRepository.createUser).toHaveBeenCalledWith(
        mockCreateUserDto,
      );
      expect(user).toEqual('mockUser');
    });
  });
});
