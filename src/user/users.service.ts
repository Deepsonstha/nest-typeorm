import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update_user_dto';
import { log } from 'console';

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
      throw new InternalServerErrorException('Error retrieving users');
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(createUser: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUser);
    return await this.userRepository.save(user);
  }

  async updateUserById(updateUser: UpdateUserDto, id: number) {
    const result = await this.userRepository.update(id, updateUser);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.userRepository.findOne({ where: { id } });
  }
  async deleteUserById(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    console.log('deleteuser', result);
  }

  async findUserById(id: number) {
    const result = await this.userRepository.findOne({ where: { id } });
    if (result === null) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return result;
    console.log('founduser', result);
  }

  async fetchUserByPost(id: number) {
    return await this.userRepository.findOne({
      where: { id: id },
      relations: ['posts'],
      select: ['id', 'name'],
    });
  }
}
