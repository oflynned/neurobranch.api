import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import * as Firebase from 'firebase-admin';
import { RawConfigService } from './app';

const firebaseConfig = RawConfigService.getInstance()
  .ensureValues(['FIREBASE_SERVICE_ACCOUNT'])
  .getFirebaseConfig();
Firebase.initializeApp(firebaseConfig);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port);
  });
}

bootstrap();
