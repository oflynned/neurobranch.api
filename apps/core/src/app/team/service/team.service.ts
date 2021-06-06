import { InvestigatorEntity, OrganisationEntity, TeamEntity } from '@db';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTeamDto } from '../dto/create-team.dto';
import { TeamRepo } from './team.repo';

@Injectable()
export class TeamService {
  constructor(private readonly repo: TeamRepo) {}

  async createTeam(
    dto: CreateTeamDto,
    investigator: InvestigatorEntity,
    id = uuid(),
    timestamp = new Date(),
  ): Promise<TeamEntity> {
    const entity: TeamEntity = {
      ...dto,
      id,
      creatorId: investigator.id,
      createdAt: timestamp,
      deletedAt: null,
    };

    return this.repo.createTeam(entity);
  }

  async getOrganisationTeamCount(organisationId: string): Promise<number> {
    return this.repo.getOrganisationTeamCount(organisationId);
  }

  async getTeamsByOrganisationId(
    organisationId: string,
    limit: number,
    offset: number,
  ): Promise<TeamEntity[]> {
    return this.repo.getTeamsByOrganisationId(organisationId, limit, offset);
  }

  async getOrganisationByTeamId(teamId: string): Promise<OrganisationEntity> {
    return this.repo.getOrganisationByTeamId(teamId);
  }
}
