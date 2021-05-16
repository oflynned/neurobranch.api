import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  InvestigatorEntity,
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
    investigator: InvestigatorEntity,
    createdAt = new Date(),
  ): Promise<TrialEntity> {
    const entity = {
      ...dto,
      investigator,
      createdAt,
    };

    return this.repo.save(entity);
  }

  async getTrialLead(trial: TrialEntity): Promise<InvestigatorEntity> {
    const joinedTrial = await this.repo.findOne({
      where: { id: trial.id },
      relations: ['investigator'],
    });

    return joinedTrial.investigator;
  }

  async getInvestigatorTrials(
    investigator: InvestigatorEntity,
    limit: number,
    offset: number,
  ): Promise<TrialEntity[]> {
    return this.repo.find({
      where: { investigator },
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getInvestigatorTrialCount(
    investigator: InvestigatorEntity,
  ): Promise<number> {
    return this.repo.count({ investigator });
  }
}
