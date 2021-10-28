import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, CoursesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
