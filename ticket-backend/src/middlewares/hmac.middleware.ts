import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';

@Injectable()
export class HmacAuthMiddleware implements NestMiddleware {
  private readonly secret = process.env.API_SECRET || 'your-secret-key';

  use(req: Request, res: Response, next: NextFunction) {
    const signature = req.headers['x-signature'] as string;
    if (!signature) {
      throw new UnauthorizedException('Missing signature');
    }

    const payload = JSON.stringify(req.body);
    const hmac = crypto
      .createHmac('sha256', this.secret)
      .update(payload)
      .digest('hex');

    if (hmac !== signature) {
      throw new UnauthorizedException('Invalid signature');
    }

    next();
  }
}