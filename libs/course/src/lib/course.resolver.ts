import { Args, Query, Resolver } from '@nestjs/graphql'
import { Course } from './models/course'
import { CourseService } from './course.service'

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
}
