import { CreateInvestigatorInput } from '../../../../types/generated-types';
import { InvestigatorEntity, Sex } from './investigator.entity';

import { date, internet, name, datatype } from 'faker/locale/en_IE';

export const buildMockInvestigator = (
  overrides?: CreateInvestigatorInput,
): InvestigatorEntity => {
  const investigator = new InvestigatorEntity();

  investigator.id = datatype.uuid();
  investigator.createdAt = new Date();
  investigator.trials = [];
  investigator.providerId = datatype.uuid();
  investigator.provider = 'google';
  investigator.sex = Sex.MALE;

  const dob = date.between(new Date(1950, 0, 0), new Date(2000, 0, 0));
  const year = dob.getFullYear();
  const month = dob.getMonth() < 10 ? `0${dob.getMonth()}` : dob.getMonth();
  const day = dob.getDay() < 10 ? `0${dob.getDay()}` : dob.getDay();
  investigator.dateOfBirth = `${year}-${month}-${day}`;

  const firstName = name.firstName();
  const lastName = name.lastName();

  investigator.name = `${firstName} ${lastName}`;
  investigator.email = internet.email(firstName, lastName, 'gmail.com');

  return { ...investigator, ...overrides };
};
