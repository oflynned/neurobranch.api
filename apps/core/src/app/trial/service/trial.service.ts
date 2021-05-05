import { Injectable } from '@nestjs/common';
import { TrialRepo } from './trial.repo';
import {
  ResearcherEntity,
  TrialEntity,
} from '../../../../../../libs/entities/src';
import { CreateTrialDto } from '../dto/create-trial.dto';
import { ServicePagination } from '../../../../../../libs/graphql/src/pagination/pagination';

@Injectable()
export class TrialService {
  constructor(private readonly trialRepo: TrialRepo) {}

  async createTrial(
    dto: CreateTrialDto,
    researcher: ResearcherEntity,
  ): Promise<TrialEntity> {
    return this.trialRepo.createTrial(dto, researcher);
  }

  async getTrialLead(trial: TrialEntity): Promise<ResearcherEntity> {
    return this.trialRepo.getTrialLead(trial);
  }

  async getResearcherTrials(
    researcher: ResearcherEntity,
    limit: number,
    offset: number,
  ): Promise<ServicePagination<TrialEntity>> {
    const results = await this.trialRepo.getResearcherTrials(
      researcher,
      limit,
      offset,
    );

    return { results, limit, offset };
  }

  async getResearcherTrialsCount(
    researcher: ResearcherEntity,
  ): Promise<number> {
    return this.trialRepo.getResearcherTrialCount(researcher);
  }
}
