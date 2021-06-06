import { InvestigatorEntity, OrganisationEntity } from '@db';
import {
  CreateOrganisationInput,
  Investigator,
  Organisation,
  OrganisationNotFound,
  OrganisationResult,
  Pagination,
  PaginationArgs,
  Sex,
  Team,
  TeamConnection,
} from '@graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
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
import { TeamService } from '../../team/service/team.service';
import { OrganisationService } from './organisation.service';

type MinimalOrganisation = Pick<
  OrganisationEntity,
  'id' | 'name' | 'slug' | 'createdAt' | 'deletedAt'
>;

@Resolver('Organisation')
@UseGuards(JwtGuard, InvestigatorGuard)
export class OrganisationResolver {
  constructor(
    private readonly organisationService: OrganisationService,
    private readonly teamService: TeamService,
  ) {}

  @Query('getOrganisationById')
  async getOrganisation(@Args('id') id: string): Promise<OrganisationResult> {
    try {
      const organisation = await this.organisationService.getOrganisationById(
        id,
      );

      return {
        ...organisation,
        creator: null,
      } as Organisation;
    } catch (e) {
      // TODO find a better way to coalesce errors as gql union types
      if (e instanceof NotFoundException) {
        return { error: e.message } as OrganisationNotFound;
      }

      throw e;
    }
  }

  @Query('getOrganisationBySlug')
  async getOrganisationBySlug(
    @Args('slug') slug: string,
  ): Promise<MinimalOrganisation> {
    return this.organisationService.getOrganisationBySlug(slug);
  }

  @Mutation('createOrganisation')
  async createOrganisation(
    @Args('input') input: CreateOrganisationInput,
    @Context('user') investigator: InvestigatorEntity,
  ): Promise<MinimalOrganisation> {
    return this.organisationService.createOrganisation(input, investigator);
  }

  @ResolveField('creator')
  async getCreator(
    @Parent() organisation: Organisation,
  ): Promise<Investigator> {
    const creator = await this.organisationService.getOrganisationCreator(
      organisation.id,
    );

    return {
      ...creator,
      sex: creator.sex as Sex,
    };
  }

  @ResolveField('teams')
  async getTeams(
    @Parent() organisation: Organisation,
    @Args('pagination') args?: PaginationArgs,
  ): Promise<TeamConnection> {
    const { limit, offset } = Pagination.validate(args);
    const totalCount = await this.teamService.getOrganisationTeamCount(
      organisation.id,
    );
    const results = await this.teamService.getTeamsByOrganisationId(
      organisation.id,
      limit,
      offset,
    );

    return new Pagination<Team>(results, totalCount, offset).getConnection();
  }
}
