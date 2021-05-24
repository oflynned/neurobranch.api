import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { InvestigatorGuard, JwtGuard } from '../../investigator/graphql/guards';
import {
  CreateTrialInput,
  Investigator,
  Sex,
  Trial,
  TrialState,
} from '../../../../../../libs/graphql/src';
import { TrialService } from '../service/trial.service';
import { CreateTrialDto } from '../dto/create-trial.dto';
import { InvestigatorEntity } from '../../../../../../prisma/nestjs';

@Resolver('Trial')
@UseGuards(JwtGuard)
export class TrialResolver {
  constructor(private readonly trialService: TrialService) {}

  @Mutation('createTrial')
  @UseGuards(InvestigatorGuard)
  async createTrial(
    @Args('input') input: CreateTrialInput,
    @Context('user') investigator: InvestigatorEntity,
  ): Promise<Trial> {
    const timestamp = new Date();
    const dto: CreateTrialDto = {
      title: input.title,
      description: input.description,
      synopsis: input.synopsis,
      tags: input.tags,
      startTime: timestamp,
      endTime: timestamp,
    };

    return this.trialService.createTrial(dto, investigator.id);
  }

  @ResolveField('lead')
  async getLead(@Parent() trial: Trial): Promise<Investigator> {
    const lead = await this.trialService.getTrialLead(trial.id);

    return {
      ...lead,
      sex: lead.sex as Sex,
    };
  }

  @ResolveField('state')
  async getState(@Parent() trial: Trial): Promise<TrialState> {
    return TrialState.DRAFT;
  }
}
