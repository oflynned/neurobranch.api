import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResearcherService } from '../service/researcher.service';
import {
  Researcher,
  ResearcherInput,
} from '../../../../../../types/generated-types';
import { ApolloError } from 'apollo-server-express';
import { CreateResearcherDto } from '../dto/create-researcher.dto';

import { internet, datatype } from 'faker';

@Resolver(() => Researcher)
export class ResearcherResolver {
  constructor(private readonly researcherService: ResearcherService) {}

  @Query('getResearcher')
  async getResearcher(
    @Args('researcherId') researcherId: string,
  ): Promise<Researcher> {
    try {
      return await this.researcherService.getResearcher(researcherId);
    } catch (e) {
      throw new ApolloError(
        `Researcher with id ${researcherId} could not be found`,
        '404',
      );
    }
  }

  @Mutation('createResearcher')
  async createResearcher(
    @Args('input') input: ResearcherInput,
  ): Promise<Researcher> {
    const dto: CreateResearcherDto = {
      ...input,
      email: internet.email(input.name),
      providerId: datatype.uuid(),
      provider: 'GOOGLE',
    };

    return await this.researcherService.createResearcher(dto);
  }
}
