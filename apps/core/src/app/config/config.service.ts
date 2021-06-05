import { BaseConfigService } from '@config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoreConfigService extends BaseConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  getRedisUrl(): string {
    return this.getValue<string>('REDIS_URL', true);
  }
}
