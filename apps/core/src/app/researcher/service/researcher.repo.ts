import { ResearcherEntity } from '../../../../../../libs/entities/src';
import { Optional } from '../../../../../../libs/common/src';
import { CreateResearcherDto } from '../dto/create-researcher.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ResearcherRepo {
  constructor(
    @InjectRepository(ResearcherEntity)
    private readonly repo: Repository<ResearcherEntity>,
  ) {}

  async getResearcherByEmail(
    email: string,
  ): Promise<Optional<ResearcherEntity>> {
    return this.repo.findOne({ email });
  }

  async getResearcherById(id: string): Promise<Optional<ResearcherEntity>> {
    return this.repo.findOne({ id });
  }

  async createResearcher(
    dto: CreateResearcherDto,
    createdAt = new Date(),
  ): Promise<ResearcherEntity> {
    return this.repo.save({ ...dto, createdAt });
  }
}
