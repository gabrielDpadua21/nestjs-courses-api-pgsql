import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: string, courseRequest: CreateCoursesDto): Promise<Courses> {
    const course = await this.coursesRepository.findByCourseId(id);
    return this.coursesRepository.updateCourse(course, courseRequest);
  }

  async findOne(id: string): Promise<Courses> {
    return this.coursesRepository.findByCourseId(id);
  }

  async findAll(): Promise<Courses[]> {
    return this.coursesRepository.findAllCourses();
  }

  async delete(userId: string): Promise<boolean> {
    const result = await this.coursesRepository.deleteCourse(userId);
    if (result === 0) throw new NotFoundException('Course not found');
    return true;
  }
}
