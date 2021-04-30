import { ResearcherInput } from '../../../../../../types/generated-types';

export type Provider = 'GOOGLE' | 'EMAIL_PASSWORD';

export type CreateResearcherDto = ResearcherInput & {
  email: string;
  providerId: string;
  provider: Provider;
};
