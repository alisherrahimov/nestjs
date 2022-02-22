import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Category } from 'src/entities/category.entity';
import { SuccessDto } from 'src/user/dto/success.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  //get all category in database
  @Get('all')
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  //get one category by id
  @Get('one/:id')
  async findOne(@Param() id: string): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  //create new category
  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'public/category');
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
        },
      }),
    }),
  )
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() category: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(image, category);
  }

  //delete category by id
  @Delete('delete/:id')
  async delete(@Param() id: string): Promise<SuccessDto> {
    return await this.categoryService.delete(id);
  }

  //update category by id
  @Post('update/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'public/category');
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
        },
      }),
    }),
  )
  async update(
    @Param() id: string,
    @UploadedFile() image: Express.Multer.File,
    @Body() category: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.update(id, image, category);
  }
}
