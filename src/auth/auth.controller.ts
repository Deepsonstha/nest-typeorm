import { Controller, Get, UseGuards, Req, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request) {
    const token = this.authService.generateJwtToken({
      email: req['user'].email,
      id: req['user'].id,
    });
    const user = plainToInstance(User, req['user']);

    return {
      message: 'Login successful',
      user: req['user'],
      token: token,
    };
  }
}
