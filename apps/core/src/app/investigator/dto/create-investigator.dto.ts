import { CreateInvestigatorInput } from '@graphql';

export type CreateInvestigatorDto = CreateInvestigatorInput & {
  email: string;
  providerId: string;
  provider: string;
};
