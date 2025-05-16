import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        '58c0cc0e0cb3319da1e95094873eec724907ccc54b337099aa7ef60ff7f2fe1f',
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    // Gán userId vào req.user
    return { userId: payload.sub, email: payload.email };
  }
}
