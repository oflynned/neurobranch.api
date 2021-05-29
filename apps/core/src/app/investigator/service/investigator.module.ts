import { forwardRef, Module } from '@nestjs/common';
import { FirebaseModule } from '@firebase';
import { PrismaModule } from '@db';
import { InvestigatorResolver } from './investigator.resolver';
import { InvestigatorService } from './investigator.service';
import { InvestigatorRepo } from './investigator.repo';
import { TrialModule } from '../../trial';

@Module({
  imports: [PrismaModule, FirebaseModule, forwardRef(() => TrialModule)],
  exports: [InvestigatorService],
  providers: [InvestigatorResolver, InvestigatorService, InvestigatorRepo],
})
export class InvestigatorModule {}
