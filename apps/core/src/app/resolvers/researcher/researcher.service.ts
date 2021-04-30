import { Researcher } from '../../../../../../types/generated-types';

export class ResearcherService{
  async getResearcher(researcherId:string):Promise<Researcher> {
    return {
      auditLog: undefined,
      createdAt: undefined,
      deletedAt: undefined,
      email: 'email',
      name: 'name',
      username: 'username',
      verifiedAt: undefined,
      id: researcherId
    }
  }
}
