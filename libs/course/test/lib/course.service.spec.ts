import { CourseService } from '../../src/lib/course.service'
import { Test } from '@nestjs/testing'
import { CourseMessages } from '../../src/lib/enums/CourseMessages'

describe('CourseService', () => {
  let courseService: CourseService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CourseService],
    }).compile()
    courseService = moduleRef.get<CourseService>(CourseService)
  })

  describe('find all courses', () => {
    it('should return an array of all existing courses', async function () {
      const specResult = [
        { id: 'courseUUID-001', title: 'Pet expert with graphQL' },
        { id: 'courseUUID-002', title: 'Pet with graphQL' },
      ]
      expect(await courseService.courses()).toStrictEqual(specResult)
    })
  })

  describe('find course', () => {
    it('should return a single course found his id ', async function () {
      const specResult = { id: 'courseUUID-001', title: 'Pet expert with graphQL' }

      expect(await courseService.course('courseUUID-001')).toStrictEqual(specResult)
    })
  })

  describe('course not found', () => {
    it('should return null ', async function () {
      expect(await courseService.course('courseUUID-003')).toBeUndefined()
    })
  })

  describe('create Course', () => {
    it('should create a new course', async function () {
      const specResult = {
        id: Date.now().toString(),
        title: 'Pet with graphQL new',
        description: 'Pet with graphQL new',
        imageUrl: 'www.image.com/image.png',
      }

      expect(
        await courseService.createCourse({
          title: 'Pet with graphQL new',
          description: 'Pet with graphQL new',
          imageUrl: 'www.image.com/image.png',
        }),
      ).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: specResult.title,
          description: specResult.description,
          imageUrl: specResult.imageUrl,
        }),
      )
    })
  })

  describe('createCourse fail', () => {
    it('should create an error', async function () {
      const specResult = CourseMessages.TITLE_ALREADY_EXIST

      expect(
        await courseService.createCourse({
          title: 'Pet with graphQL',
          description: 'Pet with graphQL',
          imageUrl: 'www.image.com/image.png',
        }),
      ).toStrictEqual(specResult)
    })
  })

  describe('update Course', () => {
    it('should update an existing course', async function () {
      const specResult = {
        id: 'courseUUID-001',
        title: 'Pet expert with graphQL',
        description: 'A new description here',
      }

      expect(
        await courseService.updateCourse('courseUUID-001', { description: 'A new description here' }),
      ).toStrictEqual(specResult)
    })
  })

  describe('delete Course', () => {
    it('should delete an existing course', async function () {
      expect(await courseService.deleteCourse('courseUUID-001')).toBeTruthy()
    })
  })

  describe('delete Course fail', () => {
    it('should not delete an existing course', async function () {
      expect(await courseService.deleteCourse('courseUUID-008')).toBeFalsy()
    })
  })
})
