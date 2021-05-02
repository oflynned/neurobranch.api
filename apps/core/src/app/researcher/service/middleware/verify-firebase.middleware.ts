import { Injectable, NestMiddleware } from '@nestjs/common';
import {
  FirebaseService,
  FirebaseTokenRequest,
} from '../../../../../../../libs/firebase/src';
import { Response, NextFunction } from 'express';

@Injectable()
export class VerifyFirebaseMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseService) {}

  async use(
    req: FirebaseTokenRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { uid, jwt } = this.firebaseService.parseHeaders(req.headers);

    req.jwt = await this.firebaseService.verifyJwt(uid, jwt);

    // TODO record user client version, last active etc...

    next();
  }
}
