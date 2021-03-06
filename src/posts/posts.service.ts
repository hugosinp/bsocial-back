import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from 'src/users/entities/user.entity';
import { User, UserDocument } from 'src/users/schema/users.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './schema/posts.schema';

@Injectable()
export class PostsService {
	constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(user: UserEntity, createPostDto: CreatePostDto) {
		try {
			return await this.postModel.create({
				author: user,
				createDate: new Date(),
				...createPostDto,
			});
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

	async findAll(): Promise<Post[]> {
		return await this.postModel
			.find({ parent: { $exists: false } })
			.sort('-createDate')
			.populate('author', ['firstname', 'lastname', 'username']);
	}

	async findOne(id: string): Promise<Post> {
		const post = await this.postModel
			.aggregate()
			.match({ $expr: { $eq: ['$_id', { $toObjectId: id }] } })
			.lookup({
				from: 'posts',
				localField: '_id',
				foreignField: 'parent',
				as: 'comments',
			});

		await this.postModel.populate(post, {
			path: 'author',
			model: 'User',
			select: 'firstname lastname username',
		});

		await this.postModel.populate(post, {
			path: 'comments.author',
			model: 'User',
			select: 'firstname lastname username',
		});

		return post[0];
	}

	async findUserPosts(username: string) {
		const user = await this.userModel.find({ username: username });
		return await this.postModel.find({ author: user }).sort('-createDate').populate('author', ['firstname', 'lastname', 'username', 'email']);
	}

	async update(id: string, updatePostDto: UpdatePostDto) {
		return await this.postModel.updateOne({ _id: id }, { ...updatePostDto });
	}

	async remove(id: string) {
		return await this.postModel.deleteOne({ _id: id });
	}
}
