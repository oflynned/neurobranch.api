import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResearcherService } from '../service/researcher.service';
import {
  Researcher,
  ResearcherInput,
} from '../../../../../../types/generated-types';
import { CreateResearcherDto } from '../dto/create-researcher.dto';
import { FirebaseJwt } from '../../../../../../libs/firebase/src';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from './guards/jwt.guard';
import { ResearcherGuard } from './guards/researcher.guard';
import { ResearcherEntity } from '../../../../../../libs/entities/src';

@Resolver(() => Researcher)
@UseGuards(JwtGuard)
export class ResearcherResolver {
  constructor(private readonly researcherService: ResearcherService) {}

  @Query('getResearcher')
  @UseGuards(ResearcherGuard)
  async getResearcher(
    @Context('user') researcher: ResearcherEntity,
  ): Promise<Researcher> {
    return researcher;
  }

  @Mutation('createResearcher')
  async createResearcher(
    @Args('input') input: ResearcherInput,
    @Context() context: { req: { jwt: FirebaseJwt } },
  ): Promise<Researcher> {
    const { jwt } = context.req;
    const dto: CreateResearcherDto = {
      ...input,
      email: jwt.email,
      providerId: jwt.uid,
      provider: jwt.firebase.sign_in_provider,
    };

    return await this.researcherService.createResearcher(dto);
  }
}
