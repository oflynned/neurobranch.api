import { Injectable } from '@nestjs/common';
import { OrganisationRepo } from './organisation.repo';
import { OrganisationEntity } from '@db';

@Injectable()
export class OrganisationService {
  constructor(private readonly organisationRepo: OrganisationRepo) {}

  async getOrganisationById(
    organisationId: string,
  ): Promise<OrganisationEntity> {
    return this.organisationRepo.getOrganisationById(organisationId);
  }
}
