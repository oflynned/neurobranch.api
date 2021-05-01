import { CoreConfigService } from './config.service';
import { mock } from 'jest-mock-extended';
import { ConfigService } from '@nestjs/config';

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
