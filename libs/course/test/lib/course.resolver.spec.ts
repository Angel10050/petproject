import { CourseResolver } from '../../src/lib/course.resolver'
import { CourseService } from '../../src/lib/course.service'

describe('CourseResolver', () => {
  let courseResolver: CourseResolver
  let courseService: CourseService

  beforeEach(() => {
    courseService = new CourseService()
    courseResolver = new CourseResolver(courseService)
  })

  describe('courses', () => {
    it('should return an array of all existing courses', async function () {
      const specResult = [
        { id: 'courseUUID-001', title: 'Pet with graphQL' },
        { id: 'courseUUID-002', title: 'Pet with graphQL' },
      ]
      jest.spyOn(courseService, 'courses').mockImplementation(() => specResult)
      expect(await courseResolver.courses()).toBe(specResult)
    })
  })

  describe('course', () => {
    it('should return a single course found his id ', async function () {
      const specResult = { id: 'courseUUID-001', title: 'Pet with graphQL' }

      jest.spyOn(courseService, 'course').mockImplementation(() => specResult)
      expect(await courseResolver.course('courseUUID-001')).toBe(specResult)
    })
  })
})
