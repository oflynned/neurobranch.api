import { Injectable } from '@nestjs/common';
import { OrganisationRepo } from './organisation.repo';
import { InvestigatorEntity, OrganisationEntity } from '@db';
import { CreateOrganisationInput } from '@graphql';
import { CreateOrganisationDto } from '../dto/create-organisation.dto';

@Injectable()
export class OrganisationService {
  constructor(private readonly organisationRepo: OrganisationRepo) {}

  async getOrganisationById(
    organisationId: string,
  ): Promise<OrganisationEntity> {
    return this.organisationRepo.getOrganisationById(organisationId);
  }

  async createOrganisation(
    input: CreateOrganisationInput,
    investigator: InvestigatorEntity,
    timestamp = new Date(),
  ): Promise<OrganisationEntity> {
    const dto: CreateOrganisationDto = {
      name: input.name,
      slug: input.slug,
      creatorId: investigator.id,
      createdAt: timestamp,
    };

    return this.organisationRepo.createOrganisation(dto);
  }
}
