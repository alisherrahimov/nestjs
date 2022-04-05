import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { SuccessDto } from './dto/success.dto';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private user: Repository<User>,
    private readonly Jwt: JwtService,
  ) {}

  //get all user in system
  async getAllUsers(): Promise<User[]> {
    return await this.user.find();
  }

  //get user by id
  async getUserById(id: string): Promise<User> {
    return await this.user.findOne(id);
  }

  //user update details
  async updateUser(id: string, user: User): Promise<SuccessDto> {
    const updatedUser = await this.user.update(id, user);
    if (updatedUser.affected == 1) {
      return { message: 'User updated successfully', success: true };
    } else {
      return { message: 'Update unsuccess', success: false };
    }
  }

  //user delete user in system
  async deleteUser(id: string): Promise<SuccessDto> {
    const deletedUser = await this.user.delete(id);
    if (deletedUser.affected == 1) {
      return { message: 'User deleted successfully', success: true };
    } else {
      return { message: 'Delete unsuccess', success: false };
    }
  }

  //user register in system
  async register(user: RegisterDto): Promise<SuccessDto> {
    const { date, email, gender, password, name, location } = user;

    try {
      const findEmail = await this.user.findOne({ email: email });
      if (findEmail) {
        return { message: 'User already registered', success: false };
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const newUser = this.user.create({
        email: email,
        born_date: date,
        password: hash,
        gender: gender,
        name: name,
        location: location,
      });

      await this.user.save(newUser);
      const { access_token } = await this.login({ email, password });
      return { access_token: access_token, success: true };
    } catch (e: any) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  //user login in system
  async login(user: LoginDto): Promise<SuccessDto> {
    const { email, password } = user;
    try {
      const checkEmail = await this.user.findOne({ email: email });
      const checkLength: boolean = checkEmail.id.length !== 0 ? false : true;
      if (checkLength) {
        return { message: 'User not found', success: false };
      }

      const checkPassword = bcrypt.compareSync(password, checkEmail.password);

      if (checkPassword) {
        const token = await this.Jwt.signAsync(
          { id: checkEmail.id, email: checkEmail.email },
          { expiresIn: '10h' },
        );
        return { access_token: token, success: true };
      } else {
        return { message: 'Password incorrect', success: false };
      }
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  //user upload avatar
  async uploadImage(
    image: Express.Multer.File,
    id: string,
  ): Promise<SuccessDto> {
    const { path } = image;
    const findUser = await this.user.findByIds([id]);
    if (findUser.length === 0) {
      return { message: 'User not found', success: false };
    }

    await this.user
      .save({
        ...findUser[0],
        avatar: path,
      })
      .then(() => {
        return { message: 'Image uploaded successfully', success: true };
      })
      .catch((err) => {
        return { message: 'Image not uploaded', success: false, error: err };
      });
  }

  //change passwod
  //hali ishlanmadi bi
  async changePassword(id: string, body: UpdateDto): Promise<SuccessDto> {
    try {
      const findUser = await this.user.findByIds([id]);

      if (findUser.length == 0) {
        return { message: 'User not found', success: false };
      }

      return { message: 'Password changed successfully', success: true };
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  //get user data in system
  async getMe(id: string): Promise<User> {
    try {
      const findUser = await this.user.findOne({ id: id });
      return findUser;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async userInteresting(id: string, array: string[]): Promise<SuccessDto> {
    try {
      const findUser = await this.user.findByIds([id]);
      if (findUser.length === 0) {
        return { message: 'User not found', success: false };
      }
      array.forEach((element) => {
        findUser[0].interesting.push(element);
      });
      await this.user.save(findUser[0]);
      return { message: 'Interesting added successfully', success: true };
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
