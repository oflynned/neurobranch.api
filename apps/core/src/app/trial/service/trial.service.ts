import { InvestigatorEntity, TrialEntity } from '@db';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTrialDto } from '../dto/create-trial.dto';
import { TrialRepo } from './trial.repo';

@Injectable()
export class TrialService {
  constructor(private readonly trialRepo: TrialRepo) {}

  async createTrial(
    dto: CreateTrialDto,
    investigatorId: string,
    id = uuid(),
    createdAt = new Date(),
  ): Promise<TrialEntity> {
    const entity: TrialEntity = {
      ...dto,
      id,
      createdAt,
      deletedAt: null,
      leadId: investigatorId,
    };

    return this.trialRepo.createTrial(entity);
  }

  async getTrialLead(trialId: string): Promise<InvestigatorEntity> {
    return this.trialRepo.getTrialLead(trialId);
  }

  async getInvestigatorTrials(
    investigatorId: string,
    limit: number,
    offset: number,
  ): Promise<TrialEntity[]> {
    return this.trialRepo.getInvestigatorTrials(investigatorId, limit, offset);
  }

  async getInvestigatorTrialsCount(investigatorId: string): Promise<number> {
    return this.trialRepo.getInvestigatorTrialCount(investigatorId);
  }
}
