import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';

import { PostgresModule } from '../../../libs/orm/src';
import {
  CoreConfigModule,
  CoreConfigService,
  InvestigatorModule,
  TrialModule,
} from './app';
import { CacheModule } from '../../../libs/cache/src';
import { RedisModule } from 'nestjs-redis';
import { FirebaseValidator } from '../../../libs/firebase/src';
import { join } from 'path';

const services = [InvestigatorModule, TrialModule];

@Module({
  imports: [
    CoreConfigModule,
    CacheModule,
    PostgresModule,
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: FirebaseValidator.applicationDefault(),
      }),
    }),
    RedisModule.forRootAsync({
      imports: [CoreConfigModule],
      inject: [CoreConfigService],
      useFactory: (config: CoreConfigService) => ({
        url: config.getRedisUrl(),
      }),
    }),
    GraphQLModule.forRootAsync({
      imports: [CoreConfigModule],
      inject: [CoreConfigService],
      useFactory: async (config: CoreConfigService) => {
        const typePath = config.isProduction()
          ? './assets/schema.graphql'
          : './app/**/*.graphql';

        return {
          useGlobalPrefix: true,
          path: '/v1/gql',
          typePaths: [join(__dirname, typePath)],
          debug: true,
          playground: true,
          introspection: true,
        };
      },
    }),
    ...services,
  ],
})
export class AppModule {}
