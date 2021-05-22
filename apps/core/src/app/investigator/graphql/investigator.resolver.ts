import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InvestigatorService } from '../service/investigator.service';
import {
  CreateInvestigatorInput,
  PaginationArgs,
  Trial,
  TrialConnection,
} from '../../../../../../libs/graphql/src';
import { CreateInvestigatorDto } from '../dto/create-investigator.dto';
import { FirebaseJwt } from '../../../../../../libs/firebase/src';
import { UseGuards } from '@nestjs/common';
import { JwtGuard, InvestigatorGuard } from './guards';
import { TrialService } from '../../trial';
import { InvestigatorEntity } from '../../../../../../libs/entities/src';
import { Pagination } from '../../../../../../libs/graphql/src/pagination/pagination';

@Resolver('Investigator')
@UseGuards(JwtGuard)
export class InvestigatorResolver {
  constructor(
    private readonly investigatorService: InvestigatorService,
    private readonly trialService: TrialService,
  ) {}

  @Query('getInvestigator')
  @UseGuards(InvestigatorGuard)
  async getInvestigator(
    @Context('user') Investigator: InvestigatorEntity,
  ): Promise<InvestigatorEntity> {
    return Investigator;
  }

  @Mutation('createInvestigator')
  async createInvestigator(
    @Args('input') input: CreateInvestigatorInput,
    @Context('jwt') jwt: FirebaseJwt,
  ): Promise<InvestigatorEntity> {
    const dto: CreateInvestigatorDto = {
      ...input,
      email: jwt.email,
      providerId: jwt.uid,
      provider: jwt.firebase.sign_in_provider,
    };

    return this.investigatorService.createInvestigator(dto);
  }

  @ResolveField('trials')
  async getTrials(
    @Parent() Investigator: InvestigatorEntity,
    @Args('pagination') paginationArgs?: PaginationArgs,
  ): Promise<TrialConnection> {
    const { limit, offset } = Pagination.validate(paginationArgs);
    const totalCount = await this.trialService.getInvestigatorTrialsCount(
      Investigator,
    );
    const { results } = await this.trialService.getInvestigatorTrials(
      Investigator,
      limit,
      offset,
    );

    const pagination = new Pagination<Trial>(results, totalCount, offset);

    return pagination.getConnection();
  }
}
