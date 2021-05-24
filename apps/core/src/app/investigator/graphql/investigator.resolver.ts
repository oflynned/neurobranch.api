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
  Investigator,
  PaginationArgs,
  Sex,
  Trial,
  TrialConnection,
} from '../../../../../../libs/graphql/src';
import { CreateInvestigatorDto } from '../dto/create-investigator.dto';
import { FirebaseJwt } from '../../../../../../libs/firebase/src';
import { UseGuards } from '@nestjs/common';
import { JwtGuard, InvestigatorGuard } from './guards';
import { TrialService } from '../../trial';
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
    @Context('user') investigator: Investigator,
  ): Promise<Investigator> {
    return investigator;
  }

  @Mutation('createInvestigator')
  async createInvestigator(
    @Args('input') input: CreateInvestigatorInput,
    @Context('jwt') jwt: FirebaseJwt,
  ): Promise<Investigator> {
    const dto: CreateInvestigatorDto = {
      ...input,
      email: jwt.email,
      providerId: jwt.uid,
      provider: jwt.firebase.sign_in_provider,
    };

    const investigator = await this.investigatorService.createInvestigator(dto);

    return {
      ...investigator,
      sex: investigator.sex as Sex,
    };
  }

  @ResolveField('trials')
  async getTrials(
    @Parent() investigator: Investigator,
    @Args('pagination') args?: PaginationArgs,
  ): Promise<TrialConnection> {
    const { limit, offset } = Pagination.validate(args);
    const totalCount = await this.trialService.getInvestigatorTrialsCount(
      investigator.id,
    );

    const { results } = await this.trialService.getInvestigatorTrials(
      investigator.id,
      limit,
      offset,
    );

    return new Pagination<Trial>(results, totalCount, offset).getConnection();
  }

  @ResolveField('isOnboarded')
  async isOnboarded(@Parent() investigator: Investigator): Promise<boolean> {
    return !!investigator.name && !!investigator.dateOfBirth;
  }
}
