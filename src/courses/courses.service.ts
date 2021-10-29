import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Courses } from './courses.entity';
import { CoursesRepository } from './courses.repository';
import { CreateCoursesDto } from './dtos/create-courses.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CoursesRepository)
    private coursesRepository: CoursesRepository,
  ) {}

  async create(course: CreateCoursesDto): Promise<Courses> {
    return this.coursesRepository.createCourse(course);
  }

  async update(id: number, courseRequest: CreateCoursesDto): Promise<Courses> {
    const course = await this.coursesRepository.findByCourseId(id);
    return this.coursesRepository.updateCourse(course, courseRequest);
  }

  async findOne(id: number): Promise<Courses> {
    return this.coursesRepository.findByCourseId(id);
  }

  async findAll(): Promise<Courses[]> {
    return this.coursesRepository.findAllCourses();
  }
}
