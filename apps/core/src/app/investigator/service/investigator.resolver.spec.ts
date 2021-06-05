import { mock } from 'jest-mock-extended';
import { TrialService } from '../../trial';
import { InvestigatorFactory } from './investigator.factory';
import { InvestigatorResolver } from './investigator.resolver';
import { InvestigatorService } from './investigator.service';

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
});
