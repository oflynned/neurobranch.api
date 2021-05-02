import { mock } from 'jest-mock-extended';
import { CacheService } from '../../cache/src';
import { FirebaseRepo } from './firebase.repo';

const mockCache = mock<CacheService>();
const firebaseRepo = new FirebaseRepo(mockCache);

describe('Firebase repo', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getJwt', () => {
    it('should return null if uid is not in cache', async () => {
      mockCache.get.mockImplementation(async () => null);

      await expect(firebaseRepo.getJwt('prefix', 'uid')).resolves.toBeNull();
    });

    it('should return jwt if uid is in cache', async () => {
      mockCache.get.mockImplementation(async () => '{ "key": "value" }');

      await expect(firebaseRepo.getJwt('prefix', 'uid')).resolves.toEqual({
        key: 'value',
      });
    });
  });

  describe('setJwt', () => {
    it('should call cache set', async () => {
      const mockJwt = {
        exp: 10,
        iat: 0,
      };
      const value = await firebaseRepo.setJwt('prefix', 'uid', mockJwt as any);

      expect(mockCache.set).toHaveBeenCalled();
      expect(value).toEqual(mockJwt);
    });

    it('should return jwt if uid is in cache', async () => {
      mockCache.get.mockImplementation(async () => '{ "key": "value" }');

      await expect(firebaseRepo.getJwt('prefix', 'uid')).resolves.toEqual({
        key: 'value',
      });
    });
  });
});
