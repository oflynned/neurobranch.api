import { RawConfigService } from './raw.config.service';
import { Codec } from '@common';
import { CredentialStore } from '@firebase';

const codec = new Codec();

describe('Raw Config', () => {
  describe('getValue', () => {
    const config = RawConfigService.getInstance({});

    describe('when throwOnMissing is true', () => {
      it('should throw on nullish value', () => {
        expect(() => config.getValue('key', true)).toThrowError(
          "Missing key 'key' in env",
        );
      });

      it('should default to true', () => {
        expect(() => config.getValue('key')).toThrow();
      });
    });

    describe('when throwOnMissing is false', () => {
      it('should not throw on truthy value', () => {
        expect(config.getValue('key', false)).toBeUndefined();
      });
    });
  });

  describe('ensureValues', () => {
    const config = RawConfigService.getInstance({ key: 'value' });

    it('should throw on missing keys', () => {
      expect(() => config.ensureValues(['otherKey'])).toThrow();
    });

    it('should return raw config instance', () => {
      expect(config.ensureValues(['key'])).toEqual(config);
    });
  });

  describe('getFirebaseConfig', () => {
    it('should throw on missing FIREBASE_SERVICE_ACCOUNT', () => {
      const config = RawConfigService.getInstance({});

      expect(() => config.getFirebaseConfig()).toThrowError(
        "Missing key 'FIREBASE_SERVICE_ACCOUNT' in env",
      );
    });

    it('should throw on malformed value', () => {
      const serviceAccount = codec.encode('{"bad":"value"');
      const config = RawConfigService.getInstance({
        FIREBASE_SERVICE_ACCOUNT: serviceAccount,
      });

      expect(() => config.getFirebaseConfig()).toThrow(
        'Unexpected end of JSON input',
      );
    });

    it('should return firebase config', () => {
      const mockCert = { key: 'value' };
      const serviceAccount = codec.encode(JSON.stringify(mockCert));
      const mockCredentialStore = ({
        cert: jest.fn().mockImplementation(() => mockCert),
      } as unknown) as CredentialStore;

      const config = RawConfigService.getInstance(
        { FIREBASE_SERVICE_ACCOUNT: serviceAccount },
        mockCredentialStore,
      );

      expect(config.getFirebaseConfig()).toEqual({
        credential: { key: 'value' },
      });
    });
  });
});
