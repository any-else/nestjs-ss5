import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  Inject,
} from '@nestjs/common';
import PostsService from './posts.service';
import { CreatePostDTO } from './DTO/createPost.dto';

@Controller('/api/v1/posts')
export default class PostsController {
  constructor(
    @Inject('PostService') private readonly postsService: PostsService,
  ) {}

  @Get()
  getAllPosts() {
    return this.postsService.getAllPostsService();
  }

  @Get('/:id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostByIdService(id);
  }

  @Post()
  createPost(@Body() post: CreatePostDTO) {
    return this.postsService.createPostService(post);
  }

  @Patch(':id')
  updatePost(@Param('id') id: string, @Body() post: CreatePostDTO) {
    return this.postsService.updatePostService(id, post);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.deletePostService(id);
  }
}
