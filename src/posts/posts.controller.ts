import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { User } from 'src/auth/decorators/users.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @User() user: UserEntity,
    @Body() createPostDto: CreatePostDto
  ) {
    return this.postsService.create(user, createPostDto);
  }

  @Get('all')
  findAll() {
    return this.postsService.findAll();
  }

  @Get('all/:id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-posts')
  findUserPosts(
    @User() user: UserEntity,
  ) {
    return this.postsService.findUserPosts(user);
  }

  @Patch('all/:id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete('all/:id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
