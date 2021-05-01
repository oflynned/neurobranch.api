import { BaseConfigService } from '../../../../../libs/config/src';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreConfigService extends BaseConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }

  getRedisUrl(): string {
    return this.getValue<string>('REDIS_URL', true);
  }
}
