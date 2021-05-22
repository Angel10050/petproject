import { Injectable } from '@nestjs/common'
import { Course } from './models/course'

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
}
