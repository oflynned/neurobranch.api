import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { CacheModule } from '@cache';
import { PrismaModule } from '@db';
import { FirebaseValidator } from '@firebase';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RedisModule } from 'nestjs-redis';
import { join } from 'path';
import { CoreConfigModule } from './app/config/config.module';
import { CoreConfigService } from './app/config/config.service';
import { InvestigatorModule } from './app/investigator/service/investigator.module';
import { OrganisationModule } from './app/organisation/service/organisation.module';
import { TeamModule } from './app/team/service/team.module';
import { TrialModule } from './app/trial/service/trial.module';

const services = [
  InvestigatorModule,
  OrganisationModule,
  TeamModule,
  TrialModule,
];

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
