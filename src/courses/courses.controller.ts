import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Courses } from './courses.entity';
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

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() createCourseDto: CreateCoursesDto,
  ): Promise<ReturnCoursesDto> {
    const course = await this.coursesService.update(id, createCourseDto);
    return {
      course,
      message: 'Success',
    };
  }

  @Get('/:id')
  async get(@Param('/:id') id: string): Promise<ReturnCoursesDto> {
    const course = await this.coursesService.findOne(id);
    return {
      course,
      message: 'Success',
    };
  }

  @Get()
  async getAll(): Promise<Courses[]> {
    const courses = await this.coursesService.findAll();
    return courses;
  }

  @Delete('/:id')
  async delete(
    @Param('id') userId: string,
  ): Promise<{ status: boolean; message: string }> {
    const result = await this.coursesService.delete(userId);
    return {
      status: result,
      message: 'Success',
    };
  }
}
