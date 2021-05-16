import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestigatorEntity, TrialEntity } from '../../entities/src';
import { BaseConfigModule, BaseConfigService } from '../../config/src';

const entities = [InvestigatorEntity, TrialEntity];

@Module({
  imports: [
    BaseConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [BaseConfigModule],
      inject: [BaseConfigService],
      useFactory: (config: BaseConfigService) => ({
        entities,
        url: config.getDatabaseUrl(),
        logging: !config.isProduction(),
        synchronize: !config.isProductionOrStaging(),
        type: 'postgres',
        keepConnectionAlive: true,
      }),
    }),
  ],
})
export class PostgresModule {}
