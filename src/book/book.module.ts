import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category, User])],
  controllers: [BookController],
  providers: [BookService],
  exports: [TypeOrmModule],
})
export class BookModule {}
