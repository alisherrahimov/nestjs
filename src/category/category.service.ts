import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlinkSync } from 'fs';
import { Category } from 'src/entities/category.entity';
import { SuccessDto } from 'src/user/dto/success.dto';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly category: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.category.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.category.findOne(id);
  }

  async create(
    image: Express.Multer.File,
    category: CreateCategoryDto,
  ): Promise<Category> {
    try {
      const newCategory = this.category.create({
        category_name: category.name,
        image: image.path,
        book: null,
      });
      return await this.category.save(newCategory);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async delete(id: string): Promise<SuccessDto> {
    try {
      const category = await this.category.findOne(id);
      unlinkSync(category.image);
      await this.category.remove(category);
      return { success: true, message: 'Category deleted' };
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async update(
    id: string,
    image: Express.Multer.File,
    category: CreateCategoryDto,
  ): Promise<Category> {
    try {
      const categoryToUpdate = await this.category.findOne(id);
      if (image) {
        unlinkSync(categoryToUpdate.image);
        categoryToUpdate.image = image.path;
      }
      categoryToUpdate.category_name = category.name;
      return await this.category.save(categoryToUpdate);
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }
}
