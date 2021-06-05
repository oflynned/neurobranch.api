import { ConfigService } from '@nestjs/config';
import { mock } from 'jest-mock-extended';
import { CoreConfigService } from './config.service';

const configService = mock<ConfigService>();
const coreConfigService = new CoreConfigService(configService);

describe('Core config service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getRedisUrl', () => {
    it('should throw on missing key', () => {
      configService.get.mockImplementation(() => undefined);

      expect(() => coreConfigService.getRedisUrl()).toThrow();
    });
  });
});
