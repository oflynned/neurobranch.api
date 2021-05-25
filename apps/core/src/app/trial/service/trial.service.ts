import { Injectable } from '@nestjs/common';
import { TrialRepo } from './trial.repo';
import { CreateTrialDto } from '../dto/create-trial.dto';
import { ServicePagination } from '../../../../../../libs/graphql/src/pagination/pagination';
import { InvestigatorEntity, TrialEntity } from '@db';

@Injectable()
export class TrialService {
  constructor(private readonly trialRepo: TrialRepo) {}

  async createTrial(
    dto: CreateTrialDto,
    investigatorId: string,
  ): Promise<TrialEntity> {
    return this.trialRepo.createTrial(dto, investigatorId);
  }

  async getTrialLead(trialId: string): Promise<InvestigatorEntity> {
    return this.trialRepo.getTrialLead(trialId);
  }

  async getInvestigatorTrials(
    investigatorId: string,
    limit: number,
    offset: number,
  ): Promise<ServicePagination<TrialEntity>> {
    const results = await this.trialRepo.getInvestigatorTrials(
      investigatorId,
      limit,
      offset,
    );

    return {
      results,
      limit,
      offset,
    };
  }

  async getInvestigatorTrialsCount(investigatorId: string): Promise<number> {
    return this.trialRepo.getInvestigatorTrialCount(investigatorId);
  }
}
