import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Post } from 'src/posts/schema/posts.schema';
import { User } from 'src/users/schema/users.schema';

export type LikeDocument = Like & Document;

@Schema()
export class Like {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
	post: Post;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	user: User;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
