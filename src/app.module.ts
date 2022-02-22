import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { CategoryModule } from './category/category.module';
import config from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, BookModule, CategoryModule],
  controllers: [AppController, UserController, CategoryController],
  providers: [AppService, UserService, CategoryService],
})
export class AppModule {}
