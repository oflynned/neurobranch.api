import { forwardRef, Module } from '@nestjs/common';
import { ResearcherResolver } from '../graphql/researcher.resolver';
import { ResearcherService } from './researcher.service';
import { ResearcherRepo } from './researcher.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearcherEntity } from '../../../../../../libs/entities/src';
import { FirebaseModule } from '../../../../../../libs/firebase/src';
import { JwtGuard, ResearcherGuard } from '../graphql/guards';
import { TrialModule } from '../../trial';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResearcherEntity]),
    FirebaseModule,
    forwardRef(() => TrialModule),
  ],
  exports: [ResearcherService, JwtGuard, ResearcherGuard],
  providers: [
    ResearcherResolver,
    ResearcherService,
    ResearcherRepo,
    JwtGuard,
    ResearcherGuard,
  ],
})
export class ResearcherModule {}
