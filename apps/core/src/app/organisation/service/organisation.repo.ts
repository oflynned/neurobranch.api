import { OrganisationEntity, PrismaService } from '@db';
import { CreateOrganisationDto } from '../dto/create-organisation.dto';

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
}
