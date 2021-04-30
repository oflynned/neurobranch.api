import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import {join} from 'path'
import { ResearcherModule } from './resolvers/researcher/researcher.module';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
