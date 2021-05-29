import { InvestigatorResolver } from './investigator.resolver';
import { InvestigatorService } from './investigator.service';
import { mock } from 'jest-mock-extended';
import { TrialService } from '../../trial';

const mockInvestigatorService = mock<InvestigatorService>();
const mockTrialService = mock<TrialService>();
const resolver = new InvestigatorResolver(
  mockInvestigatorService,
  mockTrialService,
);

describe.skip('Investigator resolver', () => {
  describe('getTrials', () => {
    it('should return pagination', async () => {
      // mockTrialService.getInvestigatorTrialsCount.mockImplementation(
      //   async () => 0,
      // );
      // mockTrialService.getInvestigatorTrials.mockImplementation(async () => ({
      //   results: [],
      //   limit: 0,
      //   offset: 0,
      // }));
      //
      // const mockInvestigator = buildMockInvestigator();
      //
      // const results = await resolver.getTrials(mockInvestigator);
      //
      // expect(results).toEqual({});
    });
  });
});
