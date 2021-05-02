import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ResearcherService } from '../service/researcher.service';
import {
  Researcher,
  ResearcherInput,
} from '../../../../../../types/generated-types';
import { ApolloError } from 'apollo-server-express';
import { CreateResearcherDto } from '../dto/create-researcher.dto';
import { FirebaseJwt } from '../../../../../../libs/firebase/src';

@Resolver(() => Researcher)
export class ResearcherResolver {
  constructor(private readonly researcherService: ResearcherService) {}

  @Query('getResearcher')
  async getResearcher(
    @Args('researcherId') researcherId: string,
    @Context() context: { req: { jwt: FirebaseJwt } },
  ): Promise<Researcher> {
    try {
      return await this.researcherService.getResearcherByEmail(
        context.req.jwt.email,
      );
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
