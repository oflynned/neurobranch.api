import { OrganisationEntity, PrismaService } from '@db';
import { CreateOrganisationDto } from '../dto/create-organisation.dto';

export class OrganisationRepo {
  constructor(private readonly repo: PrismaService) {}

  async createOrganisation(
    dto: CreateOrganisationDto,
  ): Promise<OrganisationEntity> {
    return this.repo.organisation.create({ data: dto });
  }

  async getOrganisationBySlug(slug: string): Promise<OrganisationEntity> {
    return this.repo.organisation.findFirst({ where: { slug } });
  }

  async getOrganisationById(
    organisationId: string,
  ): Promise<OrganisationEntity> {
    return this.repo.organisation.findUnique({ where: { id: organisationId } });
  }
}
