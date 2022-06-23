import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/posts/schema/posts.schema';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like, LikeDocument } from './schema/likes.schema';

@Injectable()
export class LikesService {
	constructor(@InjectModel(Like.name) private likeModel: Model<LikeDocument>, @InjectModel(Post.name) private postModel: Model<PostDocument>) { }

	async create(user: UserEntity, createLikeDto: CreateLikeDto) {
		try {

			if (await this.likeModel.exists({ user: user, post: createLikeDto.post })) {
				await this.remove(user, createLikeDto.post);
				return 0;
			} else {
				await this.likeModel.create({
					user: user,
					...createLikeDto,
				});

				return 1;
			}

		} catch (error) {
			throw new HttpException(
				{
					statusCode: HttpStatus.BAD_REQUEST,
					message: error.errors,
				},
				HttpStatus.BAD_REQUEST
			);
		}
	}

	findAll() {
		return `This action returns all likes`;
	}

	findOne(id: number) {
		return `This action returns a #${id} like`;
	}

	async getPostLikes(postId: string) {
		return await this.likeModel.count({ post: postId });
	}

	update(id: number, updateLikeDto: UpdateLikeDto) {
		return `This action updates a #${id} like`;
	}

	async remove(user: UserEntity, id: string) {
		await this.postModel.updateOne({ _id: id }, { $inc: { likesCount: -1 } });
		return await this.likeModel.deleteOne({ post: id, user: user });
	}
}
