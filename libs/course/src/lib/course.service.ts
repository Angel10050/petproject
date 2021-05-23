import { Injectable } from '@nestjs/common'
import { Course } from './models/course'
import { CreateCourseInput } from './dto/create-course.input'

@Injectable()
export class CourseService {
  items: Course[] = [
    { id: 'courseUUID-001', title: 'Pet with graphQL' },
    { id: 'courseUUID-002', title: 'Pet with graphQL' },
  ]

  public courses() {
    return this.items
  }

  public course(id: string) {
    return this.items.find((course) => course.id === id)
  }

  createCourse(input: CreateCourseInput) {
    const newCourse = {
      id: Date.now().toString(),
      ...input,
    }
    this.items.push(newCourse)
    return newCourse
  }
}
