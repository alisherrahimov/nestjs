import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { CheckTokenMiddleware } from './middleware/check.token';
import { UserController } from './user.controller';
import { UserService } from './user.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'alisher',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule, JwtModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}
