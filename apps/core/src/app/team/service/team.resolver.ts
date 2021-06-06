import { InvestigatorEntity } from '@db';
import { CreateTeamInput, Organisation, Team } from '@graphql';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InvestigatorGuard } from '../../guards/investigator.guard';
import { JwtGuard } from '../../guards/jwt.guard';
import { CreateTeamDto } from '../dto/create-team.dto';
import { TeamService } from './team.service';

@Resolver('Team')
@UseGuards(JwtGuard, InvestigatorGuard)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Mutation('createTeam')
  async createTeam(
    @Args('input') input: CreateTeamInput,
    @Context('user') investigator: InvestigatorEntity,
  ): Promise<Team> {
    const dto: CreateTeamDto = {
      name: input.name.trim(),
      slug: input.slug.trim(),
      description: input.description.trim(),
      organisationId: input.organisationId.trim(),
    };

    return this.teamService.createTeam(dto, investigator);
  }

  @ResolveField('organisation')
  async getOrganisation(@Parent() team: Team): Promise<Organisation> {
    return this.teamService.getOrganisationByTeamId(team.id);
  }
}
