import { CreateInvestigatorInput } from '../../../../../../types/generated-types';

export type CreateInvestigatorDto = CreateInvestigatorInput & {
  email: string;
  providerId: string;
  provider: string;
};
