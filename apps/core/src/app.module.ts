import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { PostgresModule } from '../../../libs/orm/src';
import { CoreConfigModule, ResearcherModule } from './app';

@Module({
  imports: [
    CoreConfigModule,
    PostgresModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), './types/generated-types.ts'),
        outputAs: 'class',
      },
      debug: true,
      playground: true,
    }),
    ResearcherModule,
  ],
})
export class AppModule {}
