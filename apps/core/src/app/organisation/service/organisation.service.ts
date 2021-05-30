import { BadRequestException, Injectable } from '@nestjs/common';
import { OrganisationRepo } from './organisation.repo';
import { InvestigatorEntity, OrganisationEntity } from '@db';
import { CreateOrganisationInput } from '@graphql';
import { CreateOrganisationDto } from '../dto/create-organisation.dto';

@Injectable()
export class OrganisationService {
  constructor(private readonly organisationRepo: OrganisationRepo) {}

  async getOrganisationById(rawId: string): Promise<OrganisationEntity> {
    const id = rawId.trim();

    if (id.length === 0) {
      throw new BadRequestException('Id must contain a value');
    }

    return this.organisationRepo.getOrganisationById(id);
  }

  async getOrganisationBySlug(rawSlug: string): Promise<OrganisationEntity> {
    const slug = rawSlug.trim();

    if (slug.length === 0) {
      throw new BadRequestException('Slug must contain a value');
    }

    return this.organisationRepo.getOrganisationBySlug(slug);
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
