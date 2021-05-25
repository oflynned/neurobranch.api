import { Injectable } from '@nestjs/common';
import { CreateTrialDto } from '../dto/create-trial.dto';
import { InvestigatorEntity, PrismaService, TrialEntity } from '@db';

@Injectable()
export class TrialRepo {
  constructor(private readonly repo: PrismaService) {}

  async createTrial(
    dto: CreateTrialDto,
    investigatorId: string,
    createdAt = new Date(),
  ): Promise<TrialEntity> {
    const entity: Omit<TrialEntity, 'id'> = {
      ...dto,
      createdAt,
      deletedAt: null,
      leadId: investigatorId,
    };

    return this.repo.trial.create({ data: entity });
  }

  async getTrialLead(trialId: string): Promise<InvestigatorEntity> {
    return this.repo.trial.findUnique({ where: { id: trialId } }).lead();
  }

  async getInvestigatorTrials(
    investigatorId: string,
    limit: number,
    offset: number,
  ): Promise<TrialEntity[]> {
    return this.repo.trial.findMany({
      where: { leadId: investigatorId },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getInvestigatorTrialCount(investigatorId: string): Promise<number> {
    return this.repo.trial.count({
      where: { leadId: investigatorId },
    });
  }
}
