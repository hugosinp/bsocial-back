import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/posts.schema';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/schema/users.schema';

@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: Post.name,
				useFactory: () => {
					const schema = PostSchema;
					return schema;
				},
			},
			{
				name: User.name,
				useFactory: () => {
					const schema = UserSchema;
					return schema;
				},
			},
		]),
	],
	controllers: [PostsController],
	providers: [PostsService, UsersService],
	exports: [PostsService],
})
export class PostsModule {}
