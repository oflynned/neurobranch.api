import { Codec, Optional } from '@common';
import {
  CredentialStore,
  FirebaseConfig,
  FirebaseServiceAccount,
  FirebaseValidator,
} from '@firebase';

export class RawConfigService {
  private env: Record<string, Optional<string>>;
  private credentialStore: CredentialStore;
  private codec: Codec;

  static getInstance(
    env: Record<string, Optional<string>> = process.env,
    credentialStore: CredentialStore = FirebaseValidator,
    codec: Codec = new Codec(),
  ): RawConfigService {
    return new RawConfigService().withEnvironment(env, credentialStore, codec);
  }

  withEnvironment(
    env: Record<string, Optional<string>> = {},
    credentialStore: CredentialStore = FirebaseValidator,
    codec: Codec = new Codec(),
  ): RawConfigService {
    this.env = env;
    this.credentialStore = credentialStore;
    this.codec = codec;

    return this;
  }

  getValue(key: string, throwOnMissing = true): Optional<string> {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`Missing key '${key}' in env`);
    }

    return value;
  }

  ensureValues(keys: string[]): RawConfigService {
    keys.forEach((k) => this.getValue(k));
    return this;
  }

  getFirebaseConfig(): FirebaseConfig {
    const encodedServiceAccount = this.getValue(
      'FIREBASE_SERVICE_ACCOUNT',
      true,
    );
    const decodedServiceAccount = this.codec.decode(encodedServiceAccount);
    const serviceAccount = JSON.parse(
      decodedServiceAccount,
    ) as FirebaseServiceAccount;

    return {
      credential: this.credentialStore.cert(serviceAccount),
    };
  }
}
