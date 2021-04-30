import { Researcher } from './researcher.model';

export class ResearcherService {
  async getResearcher(researcherId: string): Promise<Researcher> {
    return {
      createdAt: new Date(),
      deletedAt: undefined,
      verifiedAt: undefined,
      email: 'email',
      name: 'name',
      username: 'username',
      id: researcherId,
    };
  }
}
