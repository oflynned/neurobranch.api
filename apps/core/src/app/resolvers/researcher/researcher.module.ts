import { Module } from '@nestjs/common';
import { ResearcherService } from './researcher.service';
import { ResearcherResolver } from './researcher.resolver';

@Module({
  providers: [ResearcherService, ResearcherResolver]
})
export class ResearcherModule{}
