import { Injectable } from '@nestjs/common';
import * as IORedis from 'ioredis';
import { RedisService } from 'nestjs-redis';
import { Optional } from '../../common/src';
import { Ok } from 'ioredis';

type Cache = IORedis.Redis;

@Injectable()
export class CacheService {
  private readonly cache: Cache;

  constructor(redis: RedisService) {
    this.cache = redis.getClient();
  }

  async getTime(): Promise<[string, string]> {
    return this.cache.time();
  }

  async get(key: string): Promise<Optional<string>> {
    return this.cache.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<Ok | null> {
    if (ttl) {
      return this.cache.setex(key, ttl, value);
    } else {
      return this.cache.set(key, value);
    }
  }
}
