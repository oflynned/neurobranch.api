import { Module } from '@nestjs/common';
import { ResearcherResolver } from '../graphql/researcher.resolver';
import { ResearcherService } from './researcher.service';
import { ResearcherRepo } from './researcher.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearcherEntity } from '../../../../../../libs/entities/src';
import { FirebaseModule } from '../../../../../../libs/firebase/src';
import { JwtGuard } from '../graphql/guards/jwt.guard';
import { ResearcherGuard } from '../graphql/guards/researcher.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ResearcherEntity]), FirebaseModule],
  providers: [
    ResearcherResolver,
    ResearcherService,
    ResearcherRepo,
    JwtGuard,
    ResearcherGuard,
  ],
})
export class ResearcherModule {}
