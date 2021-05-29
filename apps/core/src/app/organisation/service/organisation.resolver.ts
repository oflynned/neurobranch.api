import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationEntity } from '@db';
import { JwtGuard } from '../../guards/jwt.guard';
import { InvestigatorGuard } from '../../guards/investigator.guard';

type MinimalOrganisation = Pick<
  OrganisationEntity,
  'id' | 'name' | 'slug' | 'createdAt' | 'deletedAt'
>;

@Resolver('Organisation')
@UseGuards(JwtGuard, InvestigatorGuard)
export class OrganisationResolver {
  constructor(private readonly organisationService: OrganisationService) {}

  @Query('getOrganisation')
  async getOrganisation(
    @Args('organisationId') id: string,
  ): Promise<MinimalOrganisation> {
    return this.organisationService.getOrganisationById(id);
  }
}
