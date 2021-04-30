import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreConfigService } from './config.service';

@Module({
  imports: [ConfigModule],
  providers: [CoreConfigService],
  exports: [CoreConfigService],
})
export class CoreConfigModule {}
