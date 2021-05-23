import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Course } from './models/course'
import { CourseService } from './course.service'
import { CreateCourseInput } from './dto/create-course.input'

@Resolver()
export class CourseResolver {
  constructor(private readonly service: CourseService) {}

  @Query(() => [Course])
  courses() {
    return this.service.courses()
  }

  @Query(() => Course, { nullable: true })
  course(@Args('id') id: string) {
    return this.service.course(id)
  }
  @Mutation(() => Course, { nullable: true })
  createCourse(@Args('input') input: CreateCourseInput) {
    return this.service.createCourse(input)
  }
}
