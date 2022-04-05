import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Book } from 'src/entities/book.entity';
import { SuccessDto } from 'src/user/dto/success.dto';
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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 5 },
        { name: 'audio', maxCount: 1 },
        { name: 'pdf', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: (req, file, cb) => {
            if (file.fieldname === 'image') {
              cb(null, 'public/book/image');
            }
            if (file.fieldname === 'audio') {
              cb(null, 'public/book/audio');
            }
            if (file.fieldname === 'pdf') {
              cb(null, 'public/book/pdf');
            }
          },
          filename: (req, file, cb) => {
            if (file.fieldname === 'image') {
              const imageName =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
              cb(null, file.fieldname + '-' + imageName + '.png');
            }
            if (file.fieldname === 'audio') {
              const audioName =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
              cb(null, file.fieldname + '-' + audioName + '.mp3');
            }
            if (file.fieldname === 'pdf') {
              const pdfName =
                Date.now() + '-' + Math.round(Math.random() * 1e9);
              cb(null, file.fieldname + '-' + pdfName + '.pdf');
            }
          },
        }),
      },
    ),
  )
  async create(
    @Body() book: Book,
    @Body('categoryId') categoryId: string,
    @UploadedFiles()
    files: {
      audio?: Express.Multer.File[];
      image?: Express.Multer.File[];
      pdf?: Express.Multer.File[];
    },
  ): Promise<SuccessDto> {
    return await this.bookService.createBook(
      book,
      files.image,
      files.audio,
      files.pdf,
      categoryId,
    );
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return await this.bookService.updateBook(id, book);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<Book> {
    return await this.bookService.deleteBook(id);
  }

  @Get('recommend')
  async getRecommend(@Req() req: { id: string }): Promise<Book[]> {
    const { id } = req;
    return await this.bookService.recommendBook(id);
  }

  async getBestSeller(): Promise<Book[]> {
    return await this.bookService.getBestSeller();
  }
}
