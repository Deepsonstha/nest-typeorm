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
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user_dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    try {
      return await this.userService.findAllUser();
    } catch (error) {
      throw new HttpException(
        'Error retrieving users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
