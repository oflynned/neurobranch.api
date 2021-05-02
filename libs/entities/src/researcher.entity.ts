import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity('researchers')
export class ResearcherEntity extends BaseEntity {
  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  email: string;

  @Column('varchar', { nullable: false })
  dateOfBirth: string;

  @Column('varchar', { nullable: false })
  username: string;

  @Column('varchar', { nullable: false })
  provider: string;

  @Column('varchar', { nullable: false })
  providerId: string;

  @Column('timestamptz', { nullable: true })
  verifiedAt?: Date;
}
