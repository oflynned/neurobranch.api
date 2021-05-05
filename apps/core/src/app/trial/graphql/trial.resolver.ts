import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../researcher/graphql/guards';
import {
  CreateTrialInput,
  Frequency,
  Trial,
} from '../../../../../../types/generated-types';
import {
  ResearcherEntity,
  TrialEntity,
} from '../../../../../../libs/entities/src';
import { ResearcherGuard } from '../../researcher/graphql/guards';
import { TrialService } from '../service/trial.service';
import { CreateTrialDto } from '../dto/create-trial.dto';

@Resolver('Trial')
@UseGuards(JwtGuard)
export class TrialResolver {
  constructor(private readonly trialService: TrialService) {}

  @Mutation('createTrial')
  @UseGuards(ResearcherGuard)
  async createTrial(
    @Args('input') input: CreateTrialInput,
    @Context('user') researcher: ResearcherEntity,
  ): Promise<Trial> {
    const timestamp = new Date();
    const dto: CreateTrialDto = {
      title: input.title,
      description: 'description',
      synopsis: 'synopsis',
      frequency: Frequency.DAILY,
      tags: ['tag'],
      startTime: timestamp,
      endTime: timestamp,
    };

    return this.trialService.createTrial(dto, researcher);
  }

  @ResolveField('lead')
  async getTrialLead(@Parent() trial: TrialEntity): Promise<ResearcherEntity> {
    return this.trialService.getTrialLead(trial);
  }
}
