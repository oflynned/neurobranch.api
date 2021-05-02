import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ResearcherService } from '../../service/researcher.service';

@Injectable()
export class ResearcherGuard implements CanActivate {
  constructor(private readonly researcherService: ResearcherService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { email } = ctx.jwt;

    try {
      ctx.user = await this.researcherService.getResearcherByEmail(email);
      return true;
    } catch (e) {
      return false;
    }
  }
}
