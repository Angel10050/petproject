import { Injectable } from '@nestjs/common'
import { Course } from './models/course'
import { CreateCourseInput } from './dto/create-course.input'
import { UpdateCourseInput } from './dto/update-course.input'
import { CourseMessages } from './enus/CourseMessages'

@Injectable()
export class CourseService {
  items: Course[] = [
    { id: 'courseUUID-001', title: 'Pet expert with graphQL' },
    { id: 'courseUUID-002', title: 'Pet with graphQL' },
  ]

  public courses() {
    return this.items
  }

  public course(id: string) {
    return this.items.find((course) => course.id === id)
  }

  public courseByTitle(title: string) {
    return this.items.find((course) => course.title === title)
  }

  public createCourse(input: CreateCourseInput) {
    const newCourse = {
      id: Date.now().toString(),
      ...input,
    }
    console.log(this.courseByTitle(newCourse.title))
    if (this.courseByTitle(newCourse.title) === undefined) {
      this.items.push(newCourse)
      return newCourse
    }
    return CourseMessages.TITLE_ALREADY_EXIST
  }

  public updateCourse(id: string, input: UpdateCourseInput) {
    const course = this.course(id)
    const updated = {
      ...course,
      ...input,
    }

    this.items = this.items.map((item) => {
      if (item.id === id) {
        return updated
      }
      return item
    })

    if (!course) {
      return course
    }
    return updated
  }

  public deleteCourse(id: string) {
    const course = this.course(id)
    if (!course) {
      return false
    }
    this.items = this.items.filter((value) => value.id !== id)
    return true
  }
}
