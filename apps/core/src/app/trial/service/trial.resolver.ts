import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import {
  CreateTrialInput,
  Investigator,
  Sex,
  Trial,
  TrialState,
} from '@graphql';
import { TrialService } from './trial.service';
import { CreateTrialDto } from '../dto/create-trial.dto';
import { InvestigatorEntity } from '@db';
import { JwtGuard } from '../../guards/jwt.guard';
import { InvestigatorGuard } from '../../guards/investigator.guard';

@Resolver('Trial')
@UseGuards(JwtGuard, InvestigatorGuard)
export class TrialResolver {
  constructor(private readonly trialService: TrialService) {}

  @Mutation('createTrial')
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
