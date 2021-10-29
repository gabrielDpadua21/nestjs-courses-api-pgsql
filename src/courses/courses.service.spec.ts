import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { CoursesRepository } from './courses.repository';
import { CreateCoursesDto } from './dtos/create-courses.dto';
import { Courses } from './courses.entity';

const mockCourseRepository = () => ({
  createCourse: jest.fn(),
  findByCourseId: jest.fn(),
  updateCourse: jest.fn(),
  findAllCourses: jest.fn(),
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

  describe('Courses update teste', () => {
    let mockUpdateCourseDto: CreateCoursesDto;

    beforeEach(() => {
      mockUpdateCourseDto = {
        name: 'Curso teste update',
        description: 'Lorem lorem lorem',
        workload: 12,
      };
    });

    it('Should update a course', async () => {
      coursesRepository.findByCourseId.mockResolvedValue(new Courses());
      coursesRepository.updateCourse.mockResolvedValue('mockUpdateCourse');
      const course = await service.update(1, mockUpdateCourseDto);
      expect(coursesRepository.findByCourseId).toHaveBeenLastCalledWith(1);
      expect(coursesRepository.updateCourse).toHaveBeenLastCalledWith(
        new Courses(),
        mockUpdateCourseDto,
      );
      expect(course).toEqual('mockUpdateCourse');
    });

    describe('Courses find teste', () => {
      let courseReturn: Courses;

      beforeEach(() => {
        courseReturn = new Courses();
        courseReturn.id = '1';
      });

      it('Should return a course by id', async () => {
        coursesRepository.findByCourseId.mockResolvedValue(courseReturn);
        const course = await service.findOne(1);
        expect(coursesRepository.findByCourseId).toHaveBeenLastCalledWith(1);
        expect(course.id).toBe('1');
      });

      it('Should return a course by id', async () => {
        coursesRepository.findAllCourses.mockResolvedValue([courseReturn]);
        const course = await service.findAll(1);
        expect(coursesRepository.findAllCourses).toHaveBeenLastCalledWith();
        expect(course.length).toBe(1);
      });
    });
  });
});
