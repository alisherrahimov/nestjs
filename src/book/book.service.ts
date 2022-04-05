import { CategoryService } from './../category/category.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { SuccessDto } from 'src/user/dto/success.dto';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async getBookById(id: string): Promise<Book> {
    return await this.bookRepository.findOne(id);
  }

  async createBook(
    book: Book,
    image: Express.Multer.File[],
    audio: Express.Multer.File[],
    pdf: Express.Multer.File[],
    categoryId: string,
  ): Promise<SuccessDto> {
    try {
      const findCategoryId = await this.categoryRepository.findByIds([
        categoryId,
      ]);

      if (findCategoryId.length == 0) {
        return { success: false, message: 'Category not found' };
      }
      const newBook = this.bookRepository.create({
        audio_link: audio[0].path,
        author: book.author,
        description: book.description,
        image: image[0].path,
        book_name: book.book_name,
        audio_duration: book.audio_duration,
        download_link: pdf[0].path,
        page: book.page,
        price: book.price,
        fovarite: null,
        review: null,
        category: findCategoryId,
        down_count: 0,
        type: 'free',
      });
      await this.bookRepository.save(newBook);
      return { success: true, message: 'Book created' };
    } catch (error) {
      return { success: false, message: error };
    }
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

  async recommendBook(id: string): Promise<Book[]> {
    try {
      const user = await this.userRepository.findByIds([id]);
      if (user.length == 0) {
        throw new HttpException('User not found', 404);
      }

      const books = await this.bookRepository.find({
        where: { type: 'free' },
      });
      return books;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }
  async getBestSeller(): Promise<Book[]> {
    try {
      const books = await this.bookRepository.find({
        where: { type: 'free', down_count: { gt: 0 } },
        take: 10,
      });
      return books;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
