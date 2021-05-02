import { Injectable } from '@nestjs/common';
import { TrialRepo } from './trial.repo';
import {
  ResearcherEntity,
  TrialEntity,
} from '../../../../../../libs/entities/src';
import { CreateTrialDto } from '../dto/create-trial.dto';
import { Trial } from '../../../../../../types/generated-types';

@Injectable()
export class TrialService {
  constructor(private readonly trialRepo: TrialRepo) {}

  async createTrial(
    dto: CreateTrialDto,
    researcher: ResearcherEntity,
  ): Promise<TrialEntity> {
    return this.trialRepo.createTrial(dto, researcher);
  }

  async getTrialLead(trial: Trial): Promise<ResearcherEntity> {
    return this.trialRepo.getTrialLead(trial);
  }

  async getTrialsByResearcher(
    researcher: ResearcherEntity,
  ): Promise<TrialEntity[]> {
    return this.trialRepo.getResearcherTrials(researcher);
  }
}
