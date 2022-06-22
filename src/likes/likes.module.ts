import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/posts/schema/posts.schema';
import { Like, LikeSchema } from './schema/likes.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Like.name,
        useFactory: () => {
          const schema = LikeSchema;
          return schema;
        },
      },
      {
        name: Post.name,
        useFactory: () => {
          const schema = PostSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule {}
