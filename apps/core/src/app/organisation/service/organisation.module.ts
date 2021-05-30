import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from '@db';
import { OrganisationService } from './organisation.service';
import { OrganisationRepo } from './organisation.repo';
import { OrganisationResolver } from './organisation.resolver';
import { InvestigatorModule } from '../../investigator';
import { FirebaseModule } from '@firebase';

@Module({
  imports: [PrismaModule, FirebaseModule, InvestigatorModule],
  providers: [OrganisationResolver, OrganisationService, OrganisationRepo],
  exports: [OrganisationService],
})
export class OrganisationModule {}
