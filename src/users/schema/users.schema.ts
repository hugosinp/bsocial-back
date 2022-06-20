import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Post } from 'src/posts/schema/posts.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: true })
    firstname: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: ['user'] })
    roles: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
    posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);