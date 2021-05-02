import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Frequency, Trial } from '../../../types/generated-types';
import { ResearcherEntity } from './researcher.entity';

@Entity('trials')
export class TrialEntity extends BaseEntity implements Trial {
  @Column('timestamptz', { nullable: false })
  startTime: Date;

  @Column('timestamptz', { nullable: false })
  endTime: Date;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('varchar', { nullable: false })
  synopsis: string;

  @Column('varchar', { nullable: false })
  description: string;

  @Column('varchar', { nullable: false, array: true })
  tags: string[];

  @Column('enum', { enum: Frequency, nullable: false })
  frequency: Frequency;

  @ManyToOne(
    () => ResearcherEntity,
    (researcher: ResearcherEntity) => researcher.trials,
  )
  researcher: ResearcherEntity;
}
