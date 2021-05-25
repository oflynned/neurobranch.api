import { forwardRef, Module } from '@nestjs/common';
import { FirebaseModule } from '../../../../../../libs/firebase/src';
import { JwtGuard, InvestigatorGuard } from '../graphql/guards';
import { TrialModule } from '../../trial';
import { InvestigatorService } from './investigator.service';
import { InvestigatorResolver } from '../graphql/investigator.resolver';
import { InvestigatorRepo } from './investigator.repo';
import { PrismaModule } from '@db';

@Module({
  imports: [PrismaModule, FirebaseModule, forwardRef(() => TrialModule)],
  exports: [InvestigatorService, JwtGuard, InvestigatorGuard],
  providers: [
    InvestigatorResolver,
    InvestigatorService,
    InvestigatorRepo,
    JwtGuard,
    InvestigatorGuard,
  ],
})
export class InvestigatorModule {}
