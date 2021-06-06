import { PrismaModule } from '@db';
import { FirebaseModule } from '@firebase';
import { forwardRef, Module } from '@nestjs/common';
import { InvestigatorModule } from '../../investigator/service/investigator.module';
import { TrialRepo } from './trial.repo';
import { TrialResolver } from './trial.resolver';
import { TrialService } from './trial.service';

@Module({
  imports: [PrismaModule, FirebaseModule, forwardRef(() => InvestigatorModule)],
  exports: [TrialService],
  providers: [TrialResolver, TrialService, TrialRepo],
})
export class TrialModule {}
