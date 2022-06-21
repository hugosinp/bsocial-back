import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schema/posts.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(user: UserEntity, createPostDto: CreatePostDto) {
    try {
      return await this.postModel.create({
        author: user,
        ...createPostDto,
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
    return await this.postModel.find().populate("author", [
      'firstname',
      'lastname',
      'username',
    ]);
  }

  async findOne(id: string) {
    return await this.postModel.findOne({ _id: id }).populate("author", [
      'firstname',
      'lastname',
      'username',
    ]);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
