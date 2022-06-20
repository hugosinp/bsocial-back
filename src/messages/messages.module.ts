import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schema/messages.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Message.name,
        useFactory: () => {
          const schema = MessageSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
