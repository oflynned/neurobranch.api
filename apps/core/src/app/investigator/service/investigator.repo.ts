import { Injectable } from '@nestjs/common';
import { CreateInvestigatorDto } from '../dto/create-investigator.dto';
import { PrismaService, InvestigatorEntity } from '@db';

type UpdateInvestigatorDto = Partial<
  Pick<
    InvestigatorEntity,
    'email' | 'providerId' | 'provider' | 'name' | 'dateOfBirth'
  >
>;

@Injectable()
export class InvestigatorRepo {
  constructor(private readonly repo: PrismaService) {}

  async getInvestigatorByEmail(
    email: string,
  ): Promise<InvestigatorEntity | null> {
    return this.repo.investigator.findFirst({ where: { email } });
  }

  async updateInvestigator(
    id: string,
    dto: UpdateInvestigatorDto,
  ): Promise<InvestigatorEntity> {
    return this.repo.investigator.update({ where: { id }, data: dto });
  }

  async getInvestigatorById(id: string): Promise<InvestigatorEntity | null> {
    return this.repo.investigator.findFirst({ where: { id } });
  }

  async createInvestigator(
    dto: CreateInvestigatorDto,
    createdAt = new Date(),
  ): Promise<InvestigatorEntity> {
    return this.repo.investigator.create({ data: { ...dto, createdAt } });
  }
}
