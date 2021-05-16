import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrialRepo } from './trial.repo';
import { TrialService } from './trial.service';
import { TrialEntity } from '../../../../../../libs/entities/src';
import { InvestigatorModule } from '../../investigator';
import { FirebaseModule } from '../../../../../../libs/firebase/src';
import { TrialResolver } from '../graphql/trial.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrialEntity]),
    FirebaseModule,
    forwardRef(() => InvestigatorModule),
  ],
  exports: [TrialService],
  providers: [TrialResolver, TrialService, TrialRepo],
})
export class TrialModule {}
