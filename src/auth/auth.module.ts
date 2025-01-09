import { Module } from '@nestjs/common';
import { UserService } from 'src/user/users.service';
import { PassportLocalStrategy } from './passport.local.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [PassportLocalStrategy, AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
