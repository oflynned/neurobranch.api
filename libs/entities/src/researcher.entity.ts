import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Researcher } from '../../../types/generated-types';
import { TrialEntity } from './trial.entity';

type PartialResearcher = Pick<
  Researcher,
  'id' | 'name' | 'email' | 'createdAt' | 'verifiedAt' | 'deletedAt'
>;

@Entity('researchers')
export class ResearcherEntity extends BaseEntity implements PartialResearcher {
  @Column('varchar', { nullable: false })
  name: string;

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

  @OneToMany(() => TrialEntity, (trial: TrialEntity) => trial.researcher)
  trials: TrialEntity[];
}
