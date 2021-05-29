import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { InvestigatorEntity, OrganisationEntity } from '@db';
import { JwtGuard } from '../../guards/jwt.guard';
import { InvestigatorGuard } from '../../guards/investigator.guard';
import { CreateOrganisationInput } from '@graphql';

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

  @Mutation('createOrganisation')
  async createOrganisation(
    @Args('input') input: CreateOrganisationInput,
    @Context('user') investigator: InvestigatorEntity,
  ): Promise<MinimalOrganisation> {
    return this.organisationService.createOrganisation(input, investigator);
  }
}
