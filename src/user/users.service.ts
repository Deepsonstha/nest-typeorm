import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAllUser(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error('Error retrieving users:', error); // Log the error for debugging
      throw new InternalServerErrorException('Error retrieving users');
    }
  }
  async createUser(createUser: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUser);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
