import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schema/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(createUserDto.password, 10);

    try {
      return await this.userModel.create({
        ...createUserDto,
        password: hashed,
      });
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.errors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    return await this.userModel.find({}, ['username', 'email', 'roles']);
  }

  async findOnePrivate(username: string) {
    return await this.userModel.findOne({ username: username }, [
      'firstname',
      'lastname',
      'username',
      'password',
      'email',
      'roles',
    ]);
  }

  async findOnePublic(username: string) {
    return await this.userModel.findOne({ username: username }, [
      'firstname',
      'lastname',
      'username',
      'email'
    ]);
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { username: username },
      updateUserDto,
    );
  }

  async remove(username: string) {
    return await this.userModel.deleteOne({ username: username });
  }
}
