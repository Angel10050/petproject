import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { validationSchema } from './config/validation'
import { configuration } from './config/configuration'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class CoreModule {}
