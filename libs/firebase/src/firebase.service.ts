import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { FirebaseRepo } from './firebase.repo';
import { FirebaseJwt } from './types';
import { Codec, Optional } from '@common';

@Injectable()
export class FirebaseService {
  private readonly codec = new Codec();

  constructor(
    private readonly cache: FirebaseRepo,
    private readonly authServer: FirebaseAuthenticationService,
  ) {}

  parseHeaders(headers: unknown): { jwt: string; uid: string } {
    // send the uid along for cache lookup
    const uid = headers['x-firebase-uid'] as Optional<string>;

    if (!uid) {
      throw new BadRequestException('x-firebase-uid is a required header');
    }

    const authHeader = headers['authorization'] as Optional<string>;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization is a required header');
    }

    const [realm, jwt] = authHeader.split(' ');

    if (realm !== 'Bearer') {
      throw new UnauthorizedException('Authorization realm must be bearer');
    }

    if (!jwt) {
      throw new UnauthorizedException(
        'Authorization token must contain a base64 encoded value',
      );
    }

    return { uid, jwt };
  }

  async verifyJwt(uid: string, jwt: string): Promise<FirebaseJwt> {
    const cachedJwt = await this.cache.getJwt('firebase', uid);

    if (cachedJwt) {
      return cachedJwt;
    }

    const newJwt = await this.authServer.verifyIdToken(jwt, true);
    await this.cache.setJwt('firebase', uid, newJwt);

    return newJwt;
  }
}
