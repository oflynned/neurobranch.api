import { ServiceAccount, auth, credential, AppOptions } from 'firebase-admin';

export type FirebaseServiceAccount = ServiceAccount;

export type FirebaseConfig = AppOptions;

export const FirebaseValidator = credential;

export type CredentialStore = typeof FirebaseValidator;

export type FirebaseJwt = auth.DecodedIdToken;

export type FirebaseTokenRequest = Request & {
  jwt: FirebaseJwt;
};
