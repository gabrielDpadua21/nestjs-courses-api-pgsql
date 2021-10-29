import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      throw new InternalServerErrorException(
        `Error to save in database: ${err}`,
      );
    }
  }

  async updateCourse(
    course: Courses,
    courseRequest: CreateCoursesDto,
  ): Promise<Courses> {
    try {
      const { name, description, workload } = courseRequest;
      course.name = name;
      course.description = description;
      course.workload = workload;
      await course.save();
      return course;
    } catch (err) {
      throw new InternalServerErrorException(
        `Error to save in database: ${err}`,
      );
    }
  }

  async findByCourseId(id: number): Promise<Courses> {
    const course = await this.findOne(id);
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async findAllCourses(): Promise<Courses[]> {
    const courses = await this.find();
    return courses || [];
  }
}
