import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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
    return await this.postModel.find({ parent : {$exists: false } }).populate("author", [
      'firstname',
      'lastname',
      'username',
    ]);
  }

  async findOne(id: string) {
    const post = await this.postModel.aggregate()
      .match({ $expr : { $eq: [ '$_id' , { $toObjectId: id } ] } })
      .lookup({
        from: "posts",
        localField: "_id",
        foreignField: "parent",
        as: "comments"
      });

    await this.postModel.populate(post, {
      path: "author",
      model: "User",
      select: "firstname lastname username"
    })

    await this.postModel.populate(post, {
      path: "comments.author",
      model: "User",
      select: "firstname lastname username"
    })
    
    return post[0];
  }


  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
