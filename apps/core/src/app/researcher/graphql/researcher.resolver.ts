import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ResearcherService } from '../service/researcher.service';
import {
  Researcher,
  CreateResearcherInput,
  TrialConnection,
} from '../../../../../../types/generated-types';
import { CreateResearcherDto } from '../dto/create-researcher.dto';
import { FirebaseJwt } from '../../../../../../libs/firebase/src';
import { UseGuards } from '@nestjs/common';
import { JwtGuard, ResearcherGuard } from './guards';
import { TrialService } from '../../trial';
import { ResearcherEntity } from '../../../../../../libs/entities/src';

@Resolver('Researcher')
@UseGuards(JwtGuard)
export class ResearcherResolver {
  constructor(
    private readonly researcherService: ResearcherService,
    private readonly trialService: TrialService,
  ) {}

  @Query('getResearcher')
  @UseGuards(ResearcherGuard)
  async getResearcher(
    @Context('user') researcher: ResearcherEntity,
  ): Promise<ResearcherEntity> {
    return researcher;
  }

  @Mutation('createResearcher')
  async createResearcher(
    @Args('input') input: CreateResearcherInput,
    @Context('jwt') jwt: FirebaseJwt,
  ): Promise<ResearcherEntity> {
    const dto: CreateResearcherDto = {
      ...input,
      email: jwt.email,
      providerId: jwt.uid,
      provider: jwt.firebase.sign_in_provider,
    };

    return this.researcherService.createResearcher(dto);
  }

  @ResolveField('trials')
  async getTrials(
    @Parent() researcher: ResearcherEntity,
  ): Promise<TrialConnection> {
    const trials = await this.trialService.getTrialsByResearcher(researcher);

    return {
      totalCount: 0,
      pageInfo: {
        startCursor: 'start',
        endCursor: 'end',
        hasNextPage: false,
        hasPreviousPage: false,
      },
      edges: trials.map((trial, index) => {
        return {
          node: trial,
          cursor: `${index}`,
        };
      }),
    };
  }
}
