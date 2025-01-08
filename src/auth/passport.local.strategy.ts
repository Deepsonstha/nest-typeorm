import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from 'src/user/users.service';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    // Configure the strategy to use "email" instead of "username".
    super({ usernameField: 'email' });
  }

  // The method must be named `validate`.
  async validate(email: string, password: string) {
    console.log('USERDATA', email, password);

    const user = await this.userService.findUserByEmail(email);
    console.log('USERDATA', user);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }
}
