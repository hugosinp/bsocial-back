import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/posts.schema';

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
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
