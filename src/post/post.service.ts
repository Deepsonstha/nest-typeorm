import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post_entities';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create_post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRespository: Repository<Post>,
  ) {}

  async createPost(createPost: CreatePostDto, userId: number) {
    const post = this.postRespository.create({
      ...createPost,
      user: { id: userId },
    });
    return await this.postRespository.save(post);
  }

  async findPost() {
    return await this.postRespository.find();
  }

  async findPostWithUser() {
    return await this.postRespository.find({ relations: ['user'] });
  }
}
