import { OrganisationEntity, PrismaService, TeamEntity } from '@db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamRepo {
  constructor(private readonly repo: PrismaService) {}

  async createTeam(data: TeamEntity): Promise<TeamEntity> {
    return this.repo.team.create({ data });
  }

  async getTeamById(teamId: string): Promise<TeamEntity> {
    return this.repo.team.findUnique({ where: { id: teamId } });
  }

  async getTeamBySlug(teamSlug: string): Promise<TeamEntity> {
    return this.repo.team.findFirst({ where: { slug: teamSlug } });
  }

  async getOrganisationTeamCount(organisationId: string): Promise<number> {
    return this.repo.team.count({ where: { organisationId } });
  }

  async getOrganisationByTeamId(teamId: string): Promise<OrganisationEntity> {
    return this.repo.team.findUnique({ where: { id: teamId } }).organisation();
  }

  async getTeamsByOrganisationId(
    organisationId: string,
    limit: number,
    offset: number,
  ): Promise<TeamEntity[]> {
    return this.repo.team.findMany({
      where: { organisationId },
      take: limit,
      skip: offset,
      orderBy: {
        name: 'desc',
      },
    });
  }
}
