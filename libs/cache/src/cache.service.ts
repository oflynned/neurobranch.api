import { Injectable } from '@nestjs/common';
import * as IORedis from 'ioredis';
import { RedisService } from 'nestjs-redis';
import { Optional } from '../../common/src';

type Cache = IORedis.Redis;

@Injectable()
export class CacheService {
  private readonly cache: Cache;

  constructor(redis: RedisService) {
    this.cache = redis.getClient();
  }

  async getTime(): Promise<[string, string]> {
    return await this.cache.time();
  }

  async get(key: string): Promise<Optional<string>> {
    return await this.cache.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.cache.setex(key, ttl, value);
    } else {
      await this.cache.set(key, value);
    }
  }
}
