import { Controller, Get, UseGuards, Req, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request) {
    // Extract the authenticated user from the request
    const user = req['user']; // The authenticated user is attached to req.user

    // Omit sensitive data like password
    const { password, ...userWithoutPassword } = user;

    return {
      message: 'Login successful',
      user: userWithoutPassword,
    };
  }
}
