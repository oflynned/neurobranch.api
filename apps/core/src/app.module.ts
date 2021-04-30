import { Module } from '@nestjs/common';

import { GraphQLModule } from '@nestjs/graphql';
import {join} from 'path'
import { ResearcherModule } from './app/researcher/researcher.module';

@Module({
  imports: [
    ResearcherModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), './types/generated-types.ts'),
        outputAs: 'class'
      },
      debug: true,
      playground: true
    })
  ],
})
export class AppModule {}
