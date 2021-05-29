import { OrganisationEntity, PrismaService } from '@db';

export class OrganisationRepo {
  constructor(private readonly repo: PrismaService) {}

  async getOrganisationById(
    organisationId: string,
  ): Promise<OrganisationEntity> {
    return this.repo.organisation.findUnique({ where: { id: organisationId } });
  }
}
