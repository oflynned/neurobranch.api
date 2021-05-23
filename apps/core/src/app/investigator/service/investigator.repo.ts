import { InvestigatorEntity } from '../../../../../../libs/entities/src';
import { Optional } from '../../../../../../libs/common/src';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvestigatorDto } from '../dto/create-investigator.dto';

@Injectable()
export class InvestigatorRepo {
  constructor(
    @InjectRepository(InvestigatorEntity)
    private readonly repo: Repository<InvestigatorEntity>,
  ) {}

  async getInvestigatorByEmail(
    email: string,
  ): Promise<Optional<InvestigatorEntity>> {
    return this.repo.findOne({ email });
  }

  async updateInvestigator(
    id: string,
    dto: Partial<
      Pick<InvestigatorEntity, 'email' | 'provider' | 'name' | 'dateOfBirth'>
    >,
  ): Promise<InvestigatorEntity> {
    await this.repo.update({ id }, dto);

    return this.getInvestigatorById(id);
  }

  async getInvestigatorById(id: string): Promise<Optional<InvestigatorEntity>> {
    return this.repo.findOne({ id });
  }

  async createInvestigator(
    dto: CreateInvestigatorDto,
    createdAt = new Date(),
  ): Promise<InvestigatorEntity> {
    return this.repo.save({ ...dto, createdAt });
  }
}
