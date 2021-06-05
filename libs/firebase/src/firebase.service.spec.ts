import { FirebaseService } from './firebase.service';
import { FirebaseRepo } from './firebase.repo';
import { mock } from 'jest-mock-extended';
import { FirebaseAuthenticationService } from '@aginix/nestjs-firebase-admin';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

const mockCache = mock<FirebaseRepo>();
const mockAuthServer = mock<FirebaseAuthenticationService>();
const firebaseService = new FirebaseService(mockCache, mockAuthServer);

describe('Firebase service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('parseHeaders', () => {
    it('should throw on no x-firebase-uid header', () => {
      expect(() => firebaseService.parseHeaders({})).toThrow(
        BadRequestException,
      );
    });

    it('should throw on no authorization header', () => {
      expect(() =>
        firebaseService.parseHeaders({ 'x-firebase-uid': 'uid' }),
      ).toThrow(UnauthorizedException);
    });

    it('should throw on no bearer realm in authorization header', () => {
      expect(() =>
        firebaseService.parseHeaders({
          'x-firebase-uid': 'uid',
          authorization: 'Basic',
        }),
      ).toThrow(UnauthorizedException);
    });

    it('should throw on no token in authorization header', () => {
      expect(() =>
        firebaseService.parseHeaders({
          'x-firebase-uid': 'uid',
          authorization: 'Bearer',
        }),
      ).toThrow(UnauthorizedException);
    });

    it('should return uid and jwt', () => {
      const result = firebaseService.parseHeaders({
        'x-firebase-uid': 'uid',
        authorization: 'Bearer token',
      });

      expect(result).toEqual({ uid: 'uid', jwt: 'token' });
    });
  });

  describe('verifyJwt', () => {
    it('should return cached jwt if exists', async () => {
      mockCache.getJwt.mockImplementation(async () => 'token' as any);

      await expect(firebaseService.verifyJwt('uid', 'jwt')).resolves.toEqual(
        'token',
      );
    });

    it('should return new jwt token if not in cache', async () => {
      mockCache.getJwt.mockImplementation(async () => undefined);
      mockAuthServer.verifyIdToken.mockImplementation(
        async () => 'newToken' as any,
      );

      await expect(firebaseService.verifyJwt('uid', 'jwt')).resolves.toEqual(
        'newToken',
      );
    });
  });
});
