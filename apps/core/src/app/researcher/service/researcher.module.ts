import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ResearcherResolver } from '../graphql/researcher.resolver';
import { ResearcherService } from './researcher.service';
import { ResearcherRepo } from './researcher.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearcherEntity } from '../../../../../../libs/entities/src';
import { VerifyFirebaseMiddleware } from './middleware/verify-firebase.middleware';
import { FirebaseModule } from '../../../../../../libs/firebase/src';

@Module({
  imports: [TypeOrmModule.forFeature([ResearcherEntity]), FirebaseModule],
  providers: [
    ResearcherResolver,
    ResearcherService,
    ResearcherRepo,
    VerifyFirebaseMiddleware,
  ],
})
export class ResearcherModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    // consumer.apply(VerifyFirebaseMiddleware).forRoutes('*');
  }
}
