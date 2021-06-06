import { PrismaModule } from '@db';
import { FirebaseModule } from '@firebase';
import { forwardRef, Module } from '@nestjs/common';
import { InvestigatorModule } from '../../investigator/service/investigator.module';
import { OrganisationModule } from '../../organisation/service/organisation.module';
import { TeamRepo } from './team.repo';
import { TeamResolver } from './team.resolver';
import { TeamService } from './team.service';

@Module({
  imports: [
    PrismaModule,
    FirebaseModule,
    forwardRef(() => InvestigatorModule),
    forwardRef(() => OrganisationModule),
  ],
  providers: [TeamResolver, TeamService, TeamRepo],
  exports: [TeamService],
})
export class TeamModule {}
