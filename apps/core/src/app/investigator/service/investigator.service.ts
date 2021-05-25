import { Injectable } from '@nestjs/common';
import { InvestigatorRepo } from './investigator.repo';
import { CreateInvestigatorDto } from '../dto/create-investigator.dto';
import { InvestigatorEntity } from '@db';

@Injectable()
export class InvestigatorService {
  constructor(private readonly investigatorRepo: InvestigatorRepo) {}

  async getInvestigatorByEmail(email: string): Promise<InvestigatorEntity> {
    return this.investigatorRepo.getInvestigatorByEmail(email);
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

    return this.investigatorRepo.createInvestigator(dto);
  }
}
