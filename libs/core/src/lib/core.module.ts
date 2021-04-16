import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validationSchema } from './config/validation'
import { configuration } from './config/configuration'
import { CoreResolver } from './core.resolver'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
  ],
  controllers: [],
  providers: [CoreResolver],
  exports: [],
})
export class CoreModule {}
