import { Injectable } from '@nestjs/common';
import { CacheService } from '../../cache/src';
import { Optional } from '../../common/src';
import { FirebaseJwt } from './types';

@Injectable()
export class FirebaseRepo {
  constructor(private readonly cache: CacheService) {}

  async getJwt(uid: string): Promise<Optional<FirebaseJwt>> {
    const jwt = await this.cache.get(`identity-${uid}`);

    if (!jwt) {
      return null;
    }

    return JSON.parse(jwt) as FirebaseJwt;
  }

  async setJwt(
    prefix: string,
    uid: string,
    jwt: FirebaseJwt,
  ): Promise<FirebaseJwt> {
    const ttl = jwt.exp - jwt.iat;
    await this.cache.set(`${prefix}-${uid}`, JSON.stringify(jwt), ttl);

    return jwt;
  }
}
