import { Field, ObjectType } from '@nestjs/graphql'
import { Moment } from './moment.js'

@ObjectType()
export class Course {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  title?: string
  @Field({ nullable: true })
  description?: string
  @Field({ nullable: true })
  imageUrl?: string
  @Field(() => [Moment], { nullable: true })
  moments?: string
}
