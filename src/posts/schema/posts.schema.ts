import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schema/users.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	author: User;

	@Prop({ required: true })
	content: string;

	@Prop({ required: true })
	createDate: Date;

	@Prop()
	likesCount: number;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
	parent: Post;
}

export const PostSchema = SchemaFactory.createForClass(Post);
