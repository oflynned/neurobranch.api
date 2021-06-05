import { InvestigatorEntity } from '@db';
import { v4 as uuid } from 'uuid';
import { date, internet, name, random } from 'faker';
import { Sex } from '@graphql';
import { format } from 'date-fns';

const sexSelection = ['MALE', 'FEMALE'];

abstract class AbstractFactory {
  protected getSex(): Sex {
    return random.arrayElement(sexSelection) as Sex;
  }

  protected getFirstName(sex: Sex): string {
    return name.firstName(sex === Sex.MALE ? 0 : 1);
  }

  protected getLastName(sex: Sex): string {
    return name.lastName(sex === Sex.MALE ? 0 : 1);
  }

  protected getUuid(): string {
    return uuid();
  }
}

export class InvestigatorFactory extends AbstractFactory {
  private dob: string;
  private name: string;
  private email: string;
  private sex: Sex;

  withName(name: string): InvestigatorFactory {
    this.name = name;
    return this;
  }

  withEmail(email: string): InvestigatorFactory {
    this.email = email;
    return this;
  }

  withSex(sex: Sex): InvestigatorFactory {
    this.sex = sex;
    return this;
  }

  withDob(dob: string): InvestigatorFactory {
    this.dob = dob;
    return this;
  }

  build(): InvestigatorEntity {
    const dob = date.past(50, new Date(2000, 0, 0));
    const sex = this.getSex();
    const firstName = this.getFirstName(sex);
    const lastName = this.getLastName(sex);

    return {
      id: this.getUuid(),
      name: this.name ?? `${firstName} ${lastName}`,
      email: this.email ?? internet.email(firstName, lastName),
      dateOfBirth: this.dob ?? format(dob, 'yyyy-mm-dd'),
      provider: 'google',
      providerId: this.getUuid(),
      sex: this.sex ?? (sex as Sex),
      createdAt: new Date(),
      verifiedAt: new Date(),
      deletedAt: null,
    };
  }
}
