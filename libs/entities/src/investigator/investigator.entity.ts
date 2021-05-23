import { BaseEntity } from '../base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { TrialEntity } from '../trial';
import { Investigator } from '../../../graphql/src';

type PartialInvestigator = Omit<Investigator, 'trials'>;

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@Entity('Investigators')
export class InvestigatorEntity
  extends BaseEntity
  implements PartialInvestigator {
  @Column('varchar', { nullable: false })
  name: string;

  @Column('enum', { enum: Sex, nullable: false })
  sex: Sex;

  @Column('varchar', { nullable: false })
  email: string;

  @Column('varchar', { nullable: false })
  dateOfBirth: string;

  @Column('varchar', { nullable: false })
  provider: string;

  @Column('varchar', { nullable: false })
  providerId: string;

  @Column('timestamptz', { nullable: true })
  verifiedAt?: Date;

  @OneToMany(() => TrialEntity, (trial: TrialEntity) => trial.investigator)
  trials: TrialEntity[];
}
