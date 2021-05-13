import { CreateResearcherInput } from '../../../../types/generated-types';
import { ResearcherEntity, Sex } from './researcher.entity';

import { date, internet, name, datatype } from 'faker/locale/en_IE';

export const buildMockResearcher = (
  overrides?: CreateResearcherInput,
): ResearcherEntity => {
  const researcher = new ResearcherEntity();

  researcher.id = datatype.uuid();
  researcher.createdAt = new Date();
  researcher.trials = [];
  researcher.providerId = datatype.uuid();
  researcher.provider = 'google';
  researcher.sex = Sex.MALE;

  const dob = date.between(new Date(1950, 0, 0), new Date(2000, 0, 0));
  const year = dob.getFullYear();
  const month = dob.getMonth() < 10 ? `0${dob.getMonth()}` : dob.getMonth();
  const day = dob.getDay() < 10 ? `0${dob.getDay()}` : dob.getDay();
  researcher.dateOfBirth = `${year}-${month}-${day}`;

  const firstName = name.firstName();
  const lastName = name.lastName();

  researcher.name = `${firstName} ${lastName}`;
  researcher.email = internet.email(firstName, lastName, 'gmail.com');

  return { ...researcher, ...overrides };
};
