import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create_post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post(':userId')
  async createPost(
    @Param('userId', ParseIntPipe) id: number,
    @Body() createPost: CreatePostDto,
  ) {
    console.log('postcret', createPost, id);
    return this.postService.createPost(createPost, id);
  }

  @Get()
  async finalAllPost() {
    return await this.postService.findPost();
  }

  @Get('postuser')
  async findAllPostWithUser() {
    return await this.postService.findPostWithUser();
  }
}
