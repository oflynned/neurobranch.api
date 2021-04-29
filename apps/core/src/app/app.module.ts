import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import {join} from 'path'

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), './types/generated-types.ts'),
        outputAs: 'interface'
      },
      debug: true,
      playground: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
