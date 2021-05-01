import { ConfigService } from '@nestjs/config';
import { mock } from 'jest-mock-extended';
import { BaseConfigService } from './base.config.service';

const mockConfigService = mock<ConfigService>();
const baseConfigService = new BaseConfigService(mockConfigService);

describe('Base config service', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getMode', () => {
    it('should default to development when nullish', () => {
      mockConfigService.get.mockImplementation(() => undefined);

      expect(baseConfigService.getMode()).toEqual('development');
    });

    it('should return MODE value', () => {
      mockConfigService.get.mockImplementation(() => 'something');

      expect(baseConfigService.getMode()).toEqual('something');
    });
  });

  describe('isProduction', () => {
    it('should return true when MODE is production', () => {
      mockConfigService.get.mockImplementation(() => 'production');

      expect(baseConfigService.isProduction()).toBeTruthy();
    });

    it('should return false when MODE is not production', () => {
      mockConfigService.get.mockImplementation(() => 'development');

      expect(baseConfigService.isProduction()).toBeFalsy();
    });
  });

  describe('isStaging', () => {
    it('should return true when MODE is staging', () => {
      mockConfigService.get.mockImplementation(() => 'staging');

      expect(baseConfigService.isStaging()).toBeTruthy();
    });

    it('should return false when MODE is not staging', () => {
      mockConfigService.get.mockImplementation(() => 'production');

      expect(baseConfigService.isStaging()).toBeFalsy();
    });
  });

  describe('isProductionOrStaging', () => {
    it('should return true when MODE is production', () => {
      mockConfigService.get.mockImplementation(() => 'production');

      expect(baseConfigService.isProductionOrStaging()).toBeTruthy();
    });

    it('should return true when MODE is staging', () => {
      mockConfigService.get.mockImplementation(() => 'staging');

      expect(baseConfigService.isProductionOrStaging()).toBeTruthy();
    });

    it('should return false when MODE is neither production nor staging', () => {
      mockConfigService.get.mockImplementation(() => 'development');

      expect(baseConfigService.isProductionOrStaging()).toBeFalsy();
    });
  });

  describe('isDevelopment', () => {
    it('should return true when MODE is development', () => {
      mockConfigService.get.mockImplementation(() => 'development');

      expect(baseConfigService.isDevelopment()).toBeTruthy();
    });

    it('should return false when MODE is not development', () => {
      mockConfigService.get.mockImplementation(() => 'production');

      expect(baseConfigService.isDevelopment()).toBeFalsy();
    });
  });

  describe('getDatabaseUrl', () => {
    it('should throw on missing', () => {
      mockConfigService.get.mockImplementation();

      expect(() => baseConfigService.getDatabaseUrl()).toThrow();
    });

    it('should return value', () => {
      mockConfigService.get.mockImplementation(() => 'url');

      expect(baseConfigService.getDatabaseUrl()).toEqual('url');
    });
  });
});
