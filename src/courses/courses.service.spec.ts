import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { CoursesRepository } from './courses.repository';
import { CreateCoursesDto } from './dtos/create-courses.dto';

const mockCourseRepository = () => ({
  createCourse: jest.fn(),
});

describe('Courses Test', () => {
  let service;
  let coursesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: CoursesRepository,
          useFactory: mockCourseRepository,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    coursesRepository = module.get<CoursesRepository>(CoursesRepository);
  });

  it('Should courses service be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Courses create test', () => {
    let mockCreateCourseDto: CreateCoursesDto;

    beforeEach(() => {
      mockCreateCourseDto = {
        name: 'Curso de teste',
        description: 'Lorem ipsun lotem et',
        workload: 10,
      };
    });

    it('Should create course', async () => {
      coursesRepository.createCourse.mockResolvedValue('mockCourse');
      const course = await service.create(mockCreateCourseDto);
      expect(coursesRepository.createCourse).toHaveBeenCalledWith(
        mockCreateCourseDto,
      );
      expect(course).toEqual('mockCourse');
    });
  });
});
