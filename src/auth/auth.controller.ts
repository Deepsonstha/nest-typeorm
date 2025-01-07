import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('local'))
  async login() {
    return { message: 'Login Page' };
  }
}
