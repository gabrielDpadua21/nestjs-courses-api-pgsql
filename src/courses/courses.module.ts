import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesRepository } from './courses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CoursesRepository])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
