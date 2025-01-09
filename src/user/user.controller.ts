import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  Put,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user_dto';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const alluser = await this.userService.findAllUser();
    return plainToInstance(User, alluser);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.createUser(createUserDto);
    } catch (error) {
      // Handle only application-level exceptions
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('email')
  async findUserByEmail(@Body('email') email: string) {
    return await this.userService.findUserByEmail(email);
  }

  @Patch(':id')
  async updateById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = await this.userService.updateUserById(updateUserDto, id);
    return {
      message: 'Update user successfully',
      user: user,
    };
  }

  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUserById(id);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findUserById(id);
    return {
      message: 'User successfully Found',
      user: user,
    };
  }

  @Get(':id/post')
  async getUserByPost(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.fetchUserByPost(id);
    return {
      message: 'User Post successfully Found',
      user: user,
    };
  }
}
