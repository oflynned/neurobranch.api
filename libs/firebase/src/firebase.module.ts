import { CacheModule } from '@cache';
import { Module } from '@nestjs/common';
import { FirebaseRepo } from './firebase.repo';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [CacheModule],
  providers: [FirebaseService, FirebaseRepo],
  exports: [FirebaseService],
})
export class FirebaseModule {}
