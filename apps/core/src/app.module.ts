import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { CacheModule } from '@cache';
import { PrismaModule } from '@db';
import { FirebaseValidator } from '@firebase';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RedisModule } from 'nestjs-redis';
import { join } from 'path';
import {
  CoreConfigModule,
  CoreConfigService,
  InvestigatorModule,
  OrganisationModule,
  TrialModule,
} from './app';

const services = [InvestigatorModule, OrganisationModule, TrialModule];

@Module({
  imports: [
    CoreConfigModule,
    CacheModule,
    PrismaModule,
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
