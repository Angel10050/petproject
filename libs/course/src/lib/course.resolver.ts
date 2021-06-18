import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Course } from './models/course'
import { CourseService } from './course.service'
import { CreateCourseInput } from './dto/create-course.input'
import { UpdateCourseInput } from './dto/update-course.input'
import { CourseMessages } from './enus/CourseMessages'
import { CourseException } from './exception/course.exception'

@Resolver()
export class CourseResolver {
  constructor(private readonly service: CourseService) {}

  @Query(() => [Course])
  courses() {
    return this.service.courses()
  }

  @Query(() => Course, { nullable: true })
  course(@Args('id') id: string) {
    const serviceCall = this.service.course(id)
    if (!serviceCall) {
      throw new CourseException(CourseMessages.COURSE_NOT_FOUND)
    }
    return serviceCall
  }

  @Mutation(() => Course, { nullable: true })
  createCourse(@Args('input') input: CreateCourseInput) {
    return this.service.createCourse(input)
  }

  @Mutation(() => Course, { nullable: true })
  updateCourse(@Args('id') id: string, @Args('input') input: UpdateCourseInput) {
    return this.service.updateCourse(id, input)
  }

  @Mutation(() => String, { nullable: true })
  deleteCourse(@Args('id') id: string) {
    const serviceCall = this.service.deleteCourse(id)
    if (!serviceCall) {
      throw new CourseException(CourseMessages.COURSE_NOT_FOUND)
    }
    return CourseMessages.COURSE_DELETED_SUCCESSFULLY
  }
}
