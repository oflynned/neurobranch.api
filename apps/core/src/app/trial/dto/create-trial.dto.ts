import { TrialEntity } from '../../../../../../prisma/nestjs';

export type CreateTrialDto = Pick<
  TrialEntity,
  'title' | 'description' | 'synopsis' | 'tags' | 'startTime' | 'endTime'
>;
