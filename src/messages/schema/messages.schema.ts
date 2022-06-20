import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schema/users.schema';

export type PostDocument = Post & Document;

@Schema()
export class Post {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    author: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    to: User;

    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now(), required: true })
    createDate: Date;

}

export const PostSchema = SchemaFactory.createForClass(Post);