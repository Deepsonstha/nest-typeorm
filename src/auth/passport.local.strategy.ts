import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/users.service';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    console.log('founduser ::', user);
    if (!user) {
      return new UnauthorizedException();
    }
    if (user.password == password) {
      return {
        user: user,
        message: 'Logged In Successfully',
      };
    }
  }
}
