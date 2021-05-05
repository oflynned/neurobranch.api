import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ResearcherEntity,
  TrialEntity,
} from '../../../../../../libs/entities/src';
import { CreateTrialDto } from '../dto/create-trial.dto';

@Injectable()
export class TrialRepo {
  constructor(
    @InjectRepository(TrialEntity)
    private readonly repo: Repository<TrialEntity>,
  ) {}

  async createTrial(
    dto: CreateTrialDto,
    researcher: ResearcherEntity,
    createdAt = new Date(),
  ): Promise<TrialEntity> {
    const entity = {
      ...dto,
      researcher,
      createdAt,
    };

    return this.repo.save(entity);
  }

  async getTrialLead(trial: TrialEntity): Promise<ResearcherEntity> {
    const joinedTrial = await this.repo.findOne({
      where: { id: trial.id },
      relations: ['researcher'],
    });

    return joinedTrial.researcher;
  }

  async getResearcherTrials(
    researcher: ResearcherEntity,
    limit: number,
    offset: number,
  ): Promise<TrialEntity[]> {
    return this.repo.find({
      where: { researcher },
      take: limit,
      skip: offset,
    });
  }

  async getResearcherTrialCount(researcher: ResearcherEntity): Promise<number> {
    return this.repo.count({ researcher });
  }
}
