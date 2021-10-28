import { Body, Controller, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCoursesDto } from './dtos/create-courses.dto';
import { ReturnCoursesDto } from './dtos/return-courses.dto';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Post()
  async create(
    @Body() createCourseDto: CreateCoursesDto,
  ): Promise<ReturnCoursesDto> {
    const course = await this.coursesService.create(createCourseDto);
    return {
      course,
      message: 'Success',
    };
  }
}
