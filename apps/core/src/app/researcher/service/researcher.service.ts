import { ConflictException, Injectable } from '@nestjs/common';
import { ResearcherEntity } from '../../../../../../libs/entities/src';
import { ResearcherRepo } from './researcher.repo';
import { Optional } from '../../../../../../libs/common/src';
import { CreateResearcherDto } from '../dto/create-researcher.dto';

@Injectable()
export class ResearcherService {
  constructor(private readonly researcherRepo: ResearcherRepo) {}

  async getResearcherByEmail(
    email: string,
  ): Promise<Optional<ResearcherEntity>> {
    return this.researcherRepo.getResearcherByEmail(email);
  }

  async createResearcher(dto: CreateResearcherDto): Promise<ResearcherEntity> {
    const researcher = await this.researcherRepo.getResearcherByEmail(
      dto.email,
    );

    if (researcher) {
      throw new ConflictException('Researcher email already taken');
    }

    // TODO validate dto fields

    return this.researcherRepo.createResearcher(dto);
  }
}
