import { OrganisationEntity } from '@db';

export type CreateOrganisationDto = Pick<
  OrganisationEntity,
  'name' | 'slug' | 'creatorId' | 'createdAt'
>;
