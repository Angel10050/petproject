import { ApolloError } from 'apollo-server-errors'
import { CourseMessages } from '../enus/CourseMessages'

export class CourseException extends ApolloError {
  constructor(error: CourseMessages) {
    super(error)
  }
}
