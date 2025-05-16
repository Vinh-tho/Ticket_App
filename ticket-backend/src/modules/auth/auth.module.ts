import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../../passport/local.strategy';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { JwtStrategy } from '../../passport/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret:
        '58c0cc0e0cb3319da1e95094873eec724907ccc54b337099aa7ef60ff7f2fe1f',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
