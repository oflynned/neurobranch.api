import { PrismaModule } from '@db';
import { FirebaseModule } from '@firebase';
import { Module } from '@nestjs/common';
import { InvestigatorModule } from '../../investigator';
import { OrganisationRepo } from './organisation.repo';
import { OrganisationResolver } from './organisation.resolver';
import { OrganisationService } from './organisation.service';

@Module({
  imports: [PrismaModule, FirebaseModule, InvestigatorModule],
  providers: [OrganisationResolver, OrganisationService, OrganisationRepo],
  exports: [OrganisationService],
})
export class OrganisationModule {}
