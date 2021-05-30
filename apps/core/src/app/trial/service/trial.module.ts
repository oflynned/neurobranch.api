import { forwardRef, Module } from '@nestjs/common';
import { FirebaseModule } from '@firebase';
import { PrismaModule } from '@db';
import { TrialRepo } from './trial.repo';
import { TrialService } from './trial.service';
import { TrialResolver } from './trial.resolver';
import { InvestigatorModule } from '../../investigator';

@Module({
  imports: [PrismaModule, FirebaseModule, forwardRef(() => InvestigatorModule)],
  exports: [TrialService],
  providers: [TrialResolver, TrialService, TrialRepo],
})
export class TrialModule {}
