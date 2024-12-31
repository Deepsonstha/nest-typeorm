import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create_post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Post(':id')
  async createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() createPost: CreatePostDto,
  ) {
    console.log('postcret', createPost, id);
    return this.postService.createPost(createPost, id);
  }
}
