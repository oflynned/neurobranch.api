import { PrismaModule } from '@db';
import { FirebaseModule } from '@firebase';
import { forwardRef, Module } from '@nestjs/common';
import { InvestigatorModule } from '../../investigator';
import { TeamModule } from '../../team';
import { OrganisationRepo } from './organisation.repo';
import { OrganisationResolver } from './organisation.resolver';
import { OrganisationService } from './organisation.service';

@Module({
  imports: [
    PrismaModule,
    FirebaseModule,
    forwardRef(() => InvestigatorModule),
    forwardRef(() => TeamModule),
  ],
  providers: [OrganisationResolver, OrganisationService, OrganisationRepo],
  exports: [OrganisationService],
})
export class OrganisationModule {}
