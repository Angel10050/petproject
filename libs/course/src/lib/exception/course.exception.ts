import { ApolloError } from 'apollo-server-errors'
import { CourseMessages } from '../enums/CourseMessages'

export class CourseException extends ApolloError {
  constructor(error: CourseMessages) {
    super(error)
  }
}
