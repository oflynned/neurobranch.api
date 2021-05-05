import { ResearcherResolver } from './researcher.resolver';
import { ResearcherService } from '../service/researcher.service';
import { mock } from 'jest-mock-extended';
import { TrialService } from '../../trial';
import { buildMockResearcher } from '../../../../../../libs/entities/src';

const mockResearcherService = mock<ResearcherService>();
const mockTrialService = mock<TrialService>();
const resolver = new ResearcherResolver(
  mockResearcherService,
  mockTrialService,
);

describe.skip('Researcher resolver', () => {
  describe('getTrials', () => {
    it('should return pagination', async () => {
      mockTrialService.getResearcherTrialsCount.mockImplementation(
        async () => 0,
      );
      mockTrialService.getResearcherTrials.mockImplementation(async () => ({
        results: [],
        limit: 0,
        offset: 0,
      }));

      const mockResearcher = buildMockResearcher();

      const results = await resolver.getTrials(mockResearcher);

      expect(results).toEqual({});
    });
  });
});
