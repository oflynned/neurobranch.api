import { ResearcherInput } from '../../../../../../types/generated-types';

export type CreateResearcherDto = ResearcherInput & {
  email: string;
  providerId: string;
  provider: string;
};
