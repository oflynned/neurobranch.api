import { Args, Query, Resolver } from '@nestjs/graphql';
import { ResearcherService } from './researcher.service';
import { Researcher } from '../../../../../types/generated-types';

@Resolver(() => Researcher)
export class ResearcherResolver {
  constructor(private readonly researcherService: ResearcherService) {
  }

  @Query('getResearcher')
  async getResearcher(@Args('researcherId') researcherId: string): Promise<Researcher> {
    return await this.researcherService.getResearcher(researcherId)
  }
}
