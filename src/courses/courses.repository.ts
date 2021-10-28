import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Courses } from './courses.entity';
import { CreateCoursesDto } from './dtos/create-courses.dto';

@EntityRepository(Courses)
export class CoursesRepository extends Repository<Courses> {
  async createCourse(course: CreateCoursesDto): Promise<Courses> {
    const { name, description, workload } = course;

    const newCourse = this.create();
    newCourse.name = name;
    newCourse.description = description;
    newCourse.workload = workload;
    try {
      await newCourse.save();
      return newCourse;
    } catch (err) {
      throw new InternalServerErrorException('Error to save in database');
    }
  }
}
