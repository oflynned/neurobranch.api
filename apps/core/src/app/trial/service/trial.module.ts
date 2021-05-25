import { forwardRef, Module } from '@nestjs/common';
import { TrialRepo } from './trial.repo';
import { TrialService } from './trial.service';
import { InvestigatorModule } from '../../investigator';
import { FirebaseModule } from '../../../../../../libs/firebase/src';
import { TrialResolver } from '../graphql/trial.resolver';
import { PrismaModule } from '@db';

@Module({
  imports: [PrismaModule, FirebaseModule, forwardRef(() => InvestigatorModule)],
  exports: [TrialService],
  providers: [TrialResolver, TrialService, TrialRepo],
})
export class TrialModule {}
