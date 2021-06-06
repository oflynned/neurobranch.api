import { InvestigatorEntity, OrganisationEntity } from '@db';
import { CreateOrganisationInput } from '@graphql';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrganisationDto } from '../dto/create-organisation.dto';
import { OrganisationRepo } from './organisation.repo';

@Injectable()
export class OrganisationService {
  constructor(private readonly organisationRepo: OrganisationRepo) {}

  async getOrganisationById(rawId: string): Promise<OrganisationEntity> {
    const id = rawId.trim();

    if (id.length === 0) {
      throw new BadRequestException('Id must contain a value');
    }

    const organisation = await this.organisationRepo.getOrganisationById(id);

    if (!organisation) {
      throw new NotFoundException('Organisation was not found');
    }

    return organisation;
  }

  async getOrganisationsByCreatorId(
    investigatorId: string,
    limit: number,
    offset: number,
  ): Promise<OrganisationEntity[]> {
    return await this.organisationRepo.getOrganisationsByCreatorId(
      investigatorId,
      limit,
      offset,
    );
  }

  async getOrganisationCreator(
    organisationId: string,
  ): Promise<InvestigatorEntity> {
    return this.organisationRepo.getOrganisationCreator(organisationId);
  }

  async getOrganisationBySlug(rawSlug: string): Promise<OrganisationEntity> {
    const slug = rawSlug.trim();

    if (slug.length === 0) {
      throw new BadRequestException('Slug must contain a value');
    }

    return this.organisationRepo.getOrganisationBySlug(slug);
  }

  async getOrganisationCount(investigatorId: string): Promise<number> {
    return this.organisationRepo.getOrganisationCount(investigatorId);
  }

  async createOrganisation(
    input: CreateOrganisationInput,
    investigator: InvestigatorEntity,
    timestamp = new Date(),
  ): Promise<OrganisationEntity> {
    const dto: CreateOrganisationDto = {
      name: input.name.trim(),
      slug: input.slug.trim(),
      creatorId: investigator.id,
      createdAt: timestamp,
    };

    const organisation = await this.organisationRepo.getOrganisationBySlug(
      dto.slug,
    );

    if (organisation) {
      return organisation;
    }

    return this.organisationRepo.createOrganisation(dto);
  }
}
