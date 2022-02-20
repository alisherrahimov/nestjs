import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async getBookById(id: string): Promise<Book> {
    return await this.bookRepository.findOne(id);
  }

  async createBook(book: Book): Promise<Book> {
    const newBook = this.bookRepository.create(book);
    return await this.bookRepository.save(newBook);
  }

  async updateBook(id: string, book: Book): Promise<Book> {
    const updatedBook = await this.bookRepository.update(id, book);
    console.log(updatedBook);
    return book;
  }

  async deleteBook(id: string): Promise<Book> {
    const deletedBook = await this.bookRepository.delete(id);
    console.log(deletedBook);
    return this.bookRepository.findOne(id);
  }
}
