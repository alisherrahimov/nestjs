import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Book } from 'src/entities/book.entity';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.bookService.getAllBooks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return await this.bookService.getBookById(id);
  }

  @Post('create')
  async create(@Body() book: Book): Promise<Book> {
    return await this.bookService.createBook(book);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return await this.bookService.updateBook(id, book);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<Book> {
    return await this.bookService.deleteBook(id);
  }
}
