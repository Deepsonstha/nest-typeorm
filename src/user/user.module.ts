import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { Post } from 'src/post/entities/post_entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
