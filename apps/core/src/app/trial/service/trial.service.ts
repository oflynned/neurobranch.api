import { Injectable } from '@nestjs/common';
import { TrialRepo } from './trial.repo';
import {
  InvestigatorEntity,
  TrialEntity,
} from '../../../../../../libs/entities/src';
import { CreateTrialDto } from '../dto/create-trial.dto';
import { ServicePagination } from '../../../../../../libs/graphql/src/pagination/pagination';

@Injectable()
export class TrialService {
  constructor(private readonly trialRepo: TrialRepo) {}

  async createTrial(
    dto: CreateTrialDto,
    investigator: InvestigatorEntity,
  ): Promise<TrialEntity> {
    return this.trialRepo.createTrial(dto, investigator);
  }

  async getTrialLead(trial: TrialEntity): Promise<InvestigatorEntity> {
    return this.trialRepo.getTrialLead(trial);
  }

  async getInvestigatorTrials(
    investigator: InvestigatorEntity,
    limit: number,
    offset: number,
  ): Promise<ServicePagination<TrialEntity>> {
    const results = await this.trialRepo.getInvestigatorTrials(
      investigator,
      limit,
      offset,
    );

    return { results, limit, offset };
  }

  async getInvestigatorTrialsCount(
    investigator: InvestigatorEntity,
  ): Promise<number> {
    return this.trialRepo.getInvestigatorTrialCount(investigator);
  }
}
