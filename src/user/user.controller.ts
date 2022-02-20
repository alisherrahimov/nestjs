import { UserService } from './user.service';
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
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SuccessDto } from './dto/success.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  //get all users in database
  @Get()
  async findAll(): Promise<User[]> {
    return await this.UserService.getAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.UserService.getUserById(id);
  }

  //update user in database
  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<SuccessDto> {
    return await this.UserService.updateUser(id, user);
  }

  //delete user in database
  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<SuccessDto> {
    return await this.UserService.deleteUser(id);
  }

  //user login in system
  @Post('login')
  async login(@Body() user: LoginDto): Promise<SuccessDto> {
    return await this.UserService.login(user);
  }

  //user register in system
  @Post('register')
  async register(@Body() user: RegisterDto): Promise<SuccessDto> {
    return await this.UserService.register(user);
  }

  //user upload image in system
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, 'public/avatar');
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, file.fieldname + '-' + uniqueSuffix + '.png');
        },
      }),
    }),
  )
  async uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Req() req: { id: string },
  ): Promise<SuccessDto> {
    const { id } = req;
    return await this.UserService.uploadImage(image, id);
  }

  async changePassword(@Body() email: string): Promise<SuccessDto> {
    return await this.UserService.changePassword(email);
  }
}
