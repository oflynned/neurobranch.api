import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamptz', { nullable: false })
  createdAt: Date;

  @Column('timestamptz', { nullable: true })
  deletedAt?: Date;
}
