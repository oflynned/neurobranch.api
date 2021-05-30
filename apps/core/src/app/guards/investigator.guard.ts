import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InvestigatorService } from '../investigator';

@Injectable()
export class InvestigatorGuard implements CanActivate {
  constructor(
    @Inject('InvestigatorService')
    private readonly investigatorService: InvestigatorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.jwt) {
      return false;
    }

    const investigator = await this.investigatorService.getInvestigatorByEmail(
      ctx.jwt.email,
    );

    if (!investigator) {
      return false;
    }

    ctx.user = investigator;

    return true;
  }
}
