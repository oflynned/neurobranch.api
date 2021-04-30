import { Module } from '@nestjs/common';
import { ResearcherResolver } from '../graphql/researcher.resolver';
import { ResearcherService } from './researcher.service';
import { ResearcherRepo } from './researcher.repo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearcherEntity } from '../../../../../../libs/entities/src';

@Module({
  imports: [TypeOrmModule.forFeature([ResearcherEntity])],
  providers: [ResearcherResolver, ResearcherService, ResearcherRepo],
})
export class ResearcherModule {}
