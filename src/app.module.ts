import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MessagesModule } from './messages/messages.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot(),
    	MongooseModule.forRoot(process.env.DATABASE_URL),
		UsersModule, 
		PostsModule, 
		MessagesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
