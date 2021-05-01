import { Injectable, NestMiddleware } from '@nestjs/common';
import {
  FirebaseService,
  FirebaseTokenRequest,
} from '../../../../../../../libs/firebase/src';

import { Response, NextFunction } from 'express';
import { Optional } from '../../../../../../../libs/common/src';
import { parseAuthorisationHeader } from '../../../../../../../libs/firebase/src/header.parser';
import { ApolloError } from 'apollo-server-express';

@Injectable()
export class VerifyFirebaseMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseService) {}

  async use(
    req: FirebaseTokenRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const uid = req.headers['x-firebase-uid'] as Optional<string>;

    if (!uid) {
      throw new ApolloError('x-firebase-uid is a required header', '400');
    }

    const token = parseAuthorisationHeader(req.headers['authorization']);

    req.jwt = await this.firebaseService.verifyJwt(uid, token);

    // TODO record user client version, last active etc...

    next();
  }
}
