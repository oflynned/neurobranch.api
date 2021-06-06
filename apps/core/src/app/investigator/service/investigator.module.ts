import { PrismaModule } from '@db';
import { FirebaseModule } from '@firebase';
import { forwardRef, Module } from '@nestjs/common';
import { OrganisationModule } from '../../organisation/service/organisation.module';
import { TrialModule } from '../../trial/service/trial.module';
import { InvestigatorRepo } from './investigator.repo';
import { InvestigatorResolver } from './investigator.resolver';
import { InvestigatorService } from './investigator.service';

@Module({
  imports: [
    PrismaModule,
    FirebaseModule,
    forwardRef(() => OrganisationModule),
    forwardRef(() => TrialModule),
  ],
  exports: [InvestigatorService],
  providers: [InvestigatorResolver, InvestigatorService, InvestigatorRepo],
})
export class InvestigatorModule {}
