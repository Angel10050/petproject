import { CourseResolver } from '../../src/lib/course.resolver'
import { CourseService } from '../../src/lib/course.service'
import { Test } from '@nestjs/testing'
import { CourseException } from '../../src/lib/exception/course.exception'
import { CourseMessages } from '../../src/lib/enums/CourseMessages'

describe('CourseResolver', () => {
  let courseResolver: CourseResolver
  let courseService: CourseService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CourseService, CourseResolver],
    }).compile()
    courseService = moduleRef.get<CourseService>(CourseService)
    courseResolver = moduleRef.get<CourseResolver>(CourseResolver)
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

  describe('course not found', () => {
    it('should return an error ', async function () {
      const specResult = null

      jest.spyOn(courseService, 'course').mockImplementation(() => specResult)
      await expect(() => courseResolver.course('courseUUID-001')).toThrowError(
        new CourseException(CourseMessages.COURSE_NOT_FOUND),
      )
    })
  })

  describe('createCourse', () => {
    it('should create a new course', async function () {
      const specResult = {
        id: 'courseUUID-003',
        title: 'Pet with graphQL',
        description: 'Pet with graphQL',
        imageUrl: 'www.image.com/image.png',
      }

      jest.spyOn(courseService, 'createCourse').mockImplementation(() => specResult)
      expect(
        await courseResolver.createCourse({
          title: 'Pet with graphQL',
          description: 'Pet with graphQL',
          imageUrl: 'www.image.com/image.png',
        }),
      ).toBe(specResult)
    })
  })

  describe('createCourse fail', () => {
    it('should create an error', async function () {
      const specResult = CourseMessages.TITLE_ALREADY_EXIST

      jest.spyOn(courseService, 'createCourse').mockImplementation(() => specResult)
      await expect(() =>
        courseResolver.createCourse({
          title: 'Pet with graphQL',
          description: 'Pet with graphQL',
          imageUrl: 'www.image.com/image.png',
        }),
      ).toThrowError(new CourseException(CourseMessages.TITLE_ALREADY_EXIST))
    })
  })

  describe('updateCourse', () => {
    it('should update an existing course', async function () {
      const specResult = { id: 'courseUUID-001', title: 'Pet with graphQL', description: 'A new description here' }

      jest.spyOn(courseService, 'updateCourse').mockImplementation(() => specResult)
      expect(
        await courseResolver.updateCourse('courseUUID-001', { description: 'A new description here' }),
      ).toStrictEqual(specResult)
    })
  })

  describe('deleteCourse', () => {
    it('should delete an existing course', async function () {
      const specResult = true

      jest.spyOn(courseService, 'deleteCourse').mockImplementation(() => specResult)
      expect(await courseResolver.deleteCourse('courseUUID-001')).toStrictEqual('Curso eliminado exitosamente')
    })
  })

  describe('deleteCourse', () => {
    it('should not delete an existing course', async function () {
      const specResult = false

      jest.spyOn(courseService, 'deleteCourse').mockImplementation(() => specResult)
      await expect(() => courseResolver.deleteCourse('courseUUID-008')).toThrowError(
        new CourseException(CourseMessages.COURSE_NOT_FOUND),
      )
    })
  })
})
