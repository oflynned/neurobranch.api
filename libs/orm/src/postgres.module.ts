import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearcherEntity, TrialEntity } from '../../entities/src';
import { BaseConfigModule, BaseConfigService } from '../../config/src';

const entities = [ResearcherEntity, TrialEntity];

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
