import { TrialEntity } from '@db';

export type CreateTrialDto = Pick<
  TrialEntity,
  'title' | 'description' | 'synopsis' | 'tags' | 'startTime' | 'endTime'
>;
