import { CreateResearcherInput } from '../../../../../../types/generated-types';

export type CreateResearcherDto = CreateResearcherInput & {
  email: string;
  providerId: string;
  provider: string;
};
