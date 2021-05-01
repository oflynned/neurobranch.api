import { Injectable } from '@nestjs/common';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { FirebaseRepo } from './firebase.repo';
import { FirebaseJwt } from './types';

@Injectable()
export class FirebaseService {
  constructor(
    private readonly cache: FirebaseRepo,
    private readonly authServer: FirebaseAuthenticationService,
  ) {}

  async verifyJwt(uid: string, jwt: string): Promise<FirebaseJwt> {
    const cachedJwt = await this.cache.getJwt(uid);
    if (cachedJwt) {
      return cachedJwt;
    }

    const newJwt = await this.authServer.verifyIdToken(jwt, true);
    await this.cache.setJwt('firebase', uid, newJwt);

    return newJwt;
  }
}
