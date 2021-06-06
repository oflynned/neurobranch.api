import { TeamEntity } from '@db';

export type CreateTeamDto = Pick<
  TeamEntity,
  'name' | 'slug' | 'description' | 'organisationId'
>;
