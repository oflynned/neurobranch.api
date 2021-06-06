import { InvestigatorEntity } from '@db';
import { FirebaseJwt } from '@firebase';
import {
  CreateInvestigatorInput,
  Investigator,
  Organisation,
  OrganisationConnection,
  Pagination,
  PaginationArgs,
  Sex,
  Trial,
  TrialConnection,
} from '@graphql';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InvestigatorGuard } from '../../guards/investigator.guard';
import { JwtGuard } from '../../guards/jwt.guard';
import { OrganisationService } from '../../organisation/service/organisation.service';
import { TrialService } from '../../trial/service/trial.service';
import { CreateInvestigatorDto } from '../dto/create-investigator.dto';
import { InvestigatorService } from './investigator.service';

@Resolver('Investigator')
@UseGuards(JwtGuard)
export class InvestigatorResolver {
  constructor(
    private readonly investigatorService: InvestigatorService,
    private readonly organisationService: OrganisationService,
    private readonly trialService: TrialService,
  ) {}

  @Query('getInvestigator')
  @UseGuards(InvestigatorGuard)
  async getInvestigator(
    @Context('user') investigator: InvestigatorEntity,
  ): Promise<Investigator> {
    return {
      ...investigator,
      sex: investigator.sex as Sex,
    };
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

    const results = await this.trialService.getInvestigatorTrials(
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

  @ResolveField('organisations')
  async getOrganisations(
    @Parent() investigator: Investigator,
    @Args('pagination') args?: PaginationArgs,
  ): Promise<OrganisationConnection> {
    const { limit, offset } = Pagination.validate(args);
    const totalCount = await this.organisationService.getOrganisationCount(
      investigator.id,
    );
    const results = await this.organisationService.getOrganisationsByCreatorId(
      investigator.id,
      limit,
      offset,
    );

    return new Pagination<Organisation>(
      results,
      totalCount,
      offset,
    ).getConnection();
  }
}
