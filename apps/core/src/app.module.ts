import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { join } from 'path';

import { PostgresModule } from '../../../libs/orm/src';
import { CoreConfigModule, CoreConfigService, ResearcherModule } from './app';
import { CacheModule } from '../../../libs/cache/src';
import { RedisModule } from 'nestjs-redis';
import { FirebaseValidator } from '../../../libs/firebase/src';

const services = [ResearcherModule];

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
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), './types/generated-types.ts'),
        outputAs: 'class',
      },
      debug: true,
      playground: true,
    }),
    ...services,
  ],
})
export class AppModule {}
