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
}
