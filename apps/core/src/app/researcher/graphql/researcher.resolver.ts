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
  CreateResearcherInput,
  PaginationArgs,
  Trial,
  TrialConnection,
} from '../../../../../../types/generated-types';
import { CreateResearcherDto } from '../dto/create-researcher.dto';
import { FirebaseJwt } from '../../../../../../libs/firebase/src';
import { UseGuards } from '@nestjs/common';
import { JwtGuard, ResearcherGuard } from './guards';
import { TrialService } from '../../trial';
import { ResearcherEntity } from '../../../../../../libs/entities/src';
import { Pagination } from '../../../../../../libs/graphql/src/pagination/pagination';

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
    @Args('pagination') paginationArgs: PaginationArgs,
  ): Promise<TrialConnection> {
    const { limit, offset } = Pagination.validatePagination(paginationArgs);
    const totalCount = await this.trialService.getResearcherTrialsCount(
      researcher,
    );
    const { results } = await this.trialService.getResearcherTrials(
      researcher,
      limit,
      offset,
    );

    const pagination = new Pagination<Trial>(results, totalCount, offset);

    return pagination.getConnection();
  }
}
