import { Injectable } from '@nestjs/common';
import { ResearcherEntity } from '../../../../../../libs/entities/src';
import { ResearcherRepo } from './researcher.repo';
import { Optional } from '../../../../../../libs/common/src';
import { CreateResearcherDto } from '../dto/create-researcher.dto';

@Injectable()
export class ResearcherService {
  constructor(private readonly researcherRepo: ResearcherRepo) {}

  async getResearcher(
    researcherId: string,
  ): Promise<Optional<ResearcherEntity>> {
    return this.researcherRepo.getResearcherById(researcherId);
  }

  async createResearcher(dto: CreateResearcherDto): Promise<ResearcherEntity> {
    // TODO validate dto fields

    return this.researcherRepo.createResearcher(dto);
  }
}
