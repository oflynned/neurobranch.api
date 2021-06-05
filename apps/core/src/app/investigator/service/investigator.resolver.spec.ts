import { Codec } from '@common';
import { Investigator } from '@graphql';
import { mock } from 'jest-mock-extended';
import { TrialService } from '../../trial';
import { InvestigatorFactory } from './investigator.factory';
import { InvestigatorResolver } from './investigator.resolver';
import { InvestigatorService } from './investigator.service';

const codec = new Codec();
const mockInvestigatorService = mock<InvestigatorService>();
const mockTrialService = mock<TrialService>();
const resolver = new InvestigatorResolver(
  mockInvestigatorService,
  mockTrialService,
);

describe('Investigator resolver', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getInvestigator', () => {
    it('should return investigator from context', async () => {
      const mockInvestigator = new InvestigatorFactory().build();

      await expect(resolver.getInvestigator(mockInvestigator)).resolves.toEqual(
        mockInvestigator,
      );
    });
  });

  describe('getTrials', () => {
    it('should return paginated trials', async () => {
      const investigator = new InvestigatorFactory().build();
      mockTrialService.getInvestigatorTrials.mockImplementation(async () => ({
        results: [],
        limit: 20,
        offset: 0,
      }));
      mockTrialService.getInvestigatorTrialsCount.mockImplementation(
        async () => 0,
      );

      await expect(
        resolver.getTrials(investigator as Investigator),
      ).resolves.toEqual({
        edges: [],
        totalCount: 0,
        pageInfo: {
          startCursor: codec.encode(0),
          endCursor: codec.encode(0),
          hasNextPage: false,
          hasPreviousPage: false,
        },
      });
    });
  });

  describe('isOnboarded', () => {
    it('should return false with no name', async () => {
      const investigator = new InvestigatorFactory().withName('').build();
      await expect(
        resolver.isOnboarded(investigator as Investigator),
      ).resolves.toBeFalsy();
    });

    it('should return false with no dob', async () => {
      const investigator = new InvestigatorFactory().withDob('').build();
      await expect(
        resolver.isOnboarded(investigator as Investigator),
      ).resolves.toBeFalsy();
    });

    it('should return true with both name and dob', async () => {
      const investigator = new InvestigatorFactory().build();
      await expect(
        resolver.isOnboarded(investigator as Investigator),
      ).resolves.toBeTruthy();
    });
  });
});
