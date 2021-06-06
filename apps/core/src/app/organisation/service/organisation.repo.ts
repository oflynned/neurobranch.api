import { InvestigatorEntity, OrganisationEntity, PrismaService } from '@db';
import { Injectable } from '@nestjs/common';
import { CreateOrganisationDto } from '../dto/create-organisation.dto';

@Injectable()
export class OrganisationRepo {
  constructor(private readonly repo: PrismaService) {}

  async createOrganisation(
    dto: CreateOrganisationDto,
  ): Promise<OrganisationEntity> {
    return this.repo.organisation.create({ data: dto });
  }

  async getOrganisationById(
    organisationId: string,
  ): Promise<OrganisationEntity> {
    return this.repo.organisation.findUnique({ where: { id: organisationId } });
  }

  async getOrganisationBySlug(slug: string): Promise<OrganisationEntity> {
    return this.repo.organisation.findFirst({ where: { slug } });
  }

  async getOrganisationsByCreatorId(
    investigatorId: string,
    limit: number,
    offset: number,
  ): Promise<OrganisationEntity[]> {
    return this.repo.organisation.findMany({
      where: { creatorId: investigatorId },
      take: limit,
      skip: offset,
      orderBy: {
        name: 'desc',
      },
    });
  }

  async getOrganisationCreator(
    organisationId: string,
  ): Promise<InvestigatorEntity> {
    return this.repo.organisation
      .findUnique({
        where: {
          id: organisationId,
        },
      })
      .creator();
  }

  async getOrganisationCount(investigatorId: string): Promise<number> {
    return this.repo.organisation.count({
      where: {
        creatorId: investigatorId,
      },
    });
  }
}
