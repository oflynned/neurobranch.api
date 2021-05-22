import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../investigator/graphql/guards';
import {
  CreateTrialInput,
  Frequency,
  Trial,
} from '../../../../../../libs/graphql/src';
import {
  InvestigatorEntity,
  TrialEntity,
} from '../../../../../../libs/entities/src';
import { InvestigatorGuard } from '../../investigator/graphql/guards';
import { TrialService } from '../service/trial.service';
import { CreateTrialDto } from '../dto/create-trial.dto';

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
      description: 'description',
      synopsis: 'synopsis',
      frequency: Frequency.DAILY,
      tags: ['tag'],
      startTime: timestamp,
      endTime: timestamp,
    };

    return this.trialService.createTrial(dto, investigator);
  }

  @ResolveField('lead')
  async getTrialLead(
    @Parent() trial: TrialEntity,
  ): Promise<InvestigatorEntity> {
    return this.trialService.getTrialLead(trial);
  }
}
