import { InvestigatorEntity } from '@db';
import { Injectable } from '@nestjs/common';
import { CreateInvestigatorDto } from '../dto/create-investigator.dto';
import { InvestigatorRepo } from './investigator.repo';

@Injectable()
export class InvestigatorService {
  constructor(private readonly investigatorRepo: InvestigatorRepo) {}

  async getInvestigatorByEmail(email: string): Promise<InvestigatorEntity> {
    return this.investigatorRepo.getInvestigatorByEmail(email);
  }

  async getInvestigatorByProviderUid(
    uid: string,
  ): Promise<InvestigatorEntity | null> {
    return this.investigatorRepo.getInvestigatorByProviderUid(uid);
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
