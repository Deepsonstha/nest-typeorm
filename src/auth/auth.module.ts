import { Module } from '@nestjs/common';
import { UserService } from 'src/user/users.service';
import { PassportLocalStrategy } from './passport.local.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ AuthController],
  providers: [PassportLocalStrategy],
})
export class AuthModule {}
