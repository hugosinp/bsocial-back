import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schema/users.schema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	author: User;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
	to: User;

	@Prop({ required: true })
	content: string;

	@Prop({ default: Date.now(), required: true })
	createDate: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
