import { BaseConfigService } from '../../../../../libs/config/src';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreConfigService extends BaseConfigService {
  constructor(configService: ConfigService) {
    super(configService);
  }
}
