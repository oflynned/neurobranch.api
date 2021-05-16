import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestigatorEntity } from '../../../../../../libs/entities/src';
import { FirebaseModule } from '../../../../../../libs/firebase/src';
import { JwtGuard, InvestigatorGuard } from '../graphql/guards';
import { TrialModule } from '../../trial';
import { InvestigatorService } from './investigator.service';
import { InvestigatorResolver } from '../graphql/investigator.resolver';
import { InvestigatorRepo } from './investigator.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvestigatorEntity]),
    FirebaseModule,
    forwardRef(() => TrialModule),
  ],
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
