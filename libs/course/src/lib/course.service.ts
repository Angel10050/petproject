import { Injectable } from '@nestjs/common'
import { Course } from './models/course'

@Injectable()
export class CourseService {
  item: Course[] = [
    { id: 'courseUUID-001', title: 'Pet with graphQL' },
    { id: 'courseUUID-002', title: 'Pet with graphQL' },
  ]

  public courses() {
    return this.item
  }

  public course(id: string) {
    this.item.find((course) => course.id === id)
  }
}
