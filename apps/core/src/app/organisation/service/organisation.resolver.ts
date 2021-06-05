import { InvestigatorEntity, OrganisationEntity } from '@db';
import { CreateOrganisationInput } from '@graphql';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvestigatorGuard } from '../../guards/investigator.guard';
import { JwtGuard } from '../../guards/jwt.guard';
import { OrganisationService } from './organisation.service';

type MinimalOrganisation = Pick<
  OrganisationEntity,
  'id' | 'name' | 'slug' | 'createdAt' | 'deletedAt'
>;

@Resolver('Organisation')
@UseGuards(JwtGuard, InvestigatorGuard)
export class OrganisationResolver {
  constructor(private readonly organisationService: OrganisationService) {}

  @Query('getOrganisationById')
  async getOrganisation(@Args('id') id: string): Promise<MinimalOrganisation> {
    return this.organisationService.getOrganisationById(id);
  }

  @Query('getOrganisationBySlug')
  async getOrganisationBySlug(
    @Args('slug') slug: string,
  ): Promise<MinimalOrganisation> {
    return this.organisationService.getOrganisationBySlug(slug);
  }

  @Mutation('createOrganisation')
  async createOrganisation(
    @Args('input') input: CreateOrganisationInput,
    @Context('user') investigator: InvestigatorEntity,
  ): Promise<MinimalOrganisation> {
    return this.organisationService.createOrganisation(input, investigator);
  }
}
