import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-users.dto';
import { CreateInternalUserDto } from './dtos/create-internal-user.dto';
import { Users } from './users.entity';

const mockUserRepository = () => ({
  createUser: jest.fn(),
  findAllUsers: jest.fn(),
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
    let mockInternalUserDto: CreateInternalUserDto;
    let userReturn: Users;

    beforeEach(() => {
      mockCreateUserDto = new CreateUserDto(
        'mock@gmail.com',
        'mock',
        'asterix2108',
        'asterix2108',
      );
      mockInternalUserDto = new CreateInternalUserDto(
        mockCreateUserDto.email,
        mockCreateUserDto.name,
      );
      userReturn = new Users();
      userReturn.id = '1';
      userReturn.name = 'Teste';
      userReturn.email = 'test@gmail.com';
    });

    it('Should create a user if password is equal', async () => {
      usersRepository.createUser.mockResolvedValue('mockUser');
      const user = await service.create(mockCreateUserDto);

      expect(usersRepository.createUser).toHaveBeenCalledWith(
        mockCreateUserDto,
      );
      expect(user).toEqual('mockUser');
    });

    it('Should create a user internal', async () => {
      usersRepository.createUser.mockResolvedValue('mockInternalUser');
      const user = await service.createInternal(mockInternalUserDto);
      mockCreateUserDto.password = '123mudar';
      mockCreateUserDto.passwordConfirm = '123mudar';
      expect(usersRepository.createUser).toHaveBeenCalledWith(
        mockCreateUserDto,
      );
      expect(user).toEqual('mockInternalUser');
    });

    it('Should return a users list', async () => {
      usersRepository.findAllUsers.mockResolvedValue([userReturn]);
      const users = await service.findAll();
      expect(usersRepository.findAllUsers).toHaveBeenCalledWith();
      expect(users.length).toBe(1);
    });
  });
});
