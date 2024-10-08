import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { CacheService } from './cache.service';

@Module({
  imports: [RedisModule],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
