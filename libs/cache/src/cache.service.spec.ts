import * as IORedis from 'ioredis';
import { RedisService } from 'nestjs-redis';
import { CacheService } from './cache.service';

const redisClient = ({
  get: jest.fn(),
  set: jest.fn(),
  setex: jest.fn(),
} as unknown) as IORedis.Redis;
const redisService = { getClient: () => redisClient } as RedisService;
const cacheService = new CacheService(redisService);

describe('CacheService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('get', () => {
    it('should return string value', async () => {
      redisClient.get = jest.fn().mockImplementation(async () => 'value');

      await expect(cacheService.get('cache', 'key')).resolves.toEqual('value');
    });
  });

  describe('set', () => {
    describe('without ttl', () => {
      it('should call set', async () => {
        await cacheService.set('cache', 'key', 'value');

        expect(redisClient.set).toHaveBeenCalled();
      });
    });

    describe('with ttl', () => {
      it('should call setex', async () => {
        await cacheService.set('cache', 'key', 'value', 3600);

        expect(redisClient.setex).toHaveBeenCalled();
      });
    });
  });
});
