import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { FirebaseRepo } from './firebase.repo';
import { CacheModule } from '../../cache/src';

@Module({
  imports: [CacheModule],
  providers: [FirebaseService, FirebaseRepo],
  exports: [FirebaseService],
})
export class FirebaseModule {}
