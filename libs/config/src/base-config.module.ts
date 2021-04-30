import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BaseConfigService } from './base-config.service';

@Module({
  imports: [ConfigModule],
  providers: [BaseConfigService],
  exports: [BaseConfigService],
})
export class BaseConfigModule {}
