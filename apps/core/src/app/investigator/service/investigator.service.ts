import { Injectable } from '@nestjs/common';
import { InvestigatorEntity } from '../../../../../../libs/entities/src';
import { Optional } from '../../../../../../libs/common/src';
import { InvestigatorRepo } from './investigator.repo';
import { CreateInvestigatorDto } from '../dto/create-investigator.dto';

@Injectable()
export class InvestigatorService {
  constructor(private readonly investigatorRepo: InvestigatorRepo) {}

  async getInvestigatorByEmail(
    email: string,
  ): Promise<Optional<InvestigatorEntity>> {
    return this.investigatorRepo.getInvestigatorByEmail(email);
  }

  async getinvestigatorById(id: string): Promise<Optional<InvestigatorEntity>> {
    return this.investigatorRepo.getInvestigatorById(id);
  }

  async createInvestigator(
    dto: CreateInvestigatorDto,
  ): Promise<InvestigatorEntity> {
    const investigator = await this.investigatorRepo.getInvestigatorByEmail(
      dto.email,
    );

    if (investigator) {
      return investigator;
    }

    // TODO validate dto fields

    return this.investigatorRepo.createInvestigator(dto);
  }
}
