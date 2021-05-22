import { CreateInvestigatorInput } from '../../../../../../libs/graphql/src';

export type CreateInvestigatorDto = CreateInvestigatorInput & {
  email: string;
  providerId: string;
  provider: string;
};
