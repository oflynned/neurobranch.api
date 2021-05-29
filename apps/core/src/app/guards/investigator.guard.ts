import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InvestigatorService } from '../investigator';

@Injectable()
export class InvestigatorGuard implements CanActivate {
  // constructor(private readonly investigatorService: InvestigatorService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.jwt) {
      return false;
      // throw new UnauthorizedException('No jwt context set');
    }

    // const investigator = await this.investigatorService.getInvestigatorByEmail(
    //   ctx.jwt.email,
    // );

    // if (!investigator) {
    //   return false;
    // throw new UnauthorizedException('Jwt does not belong to a investigator');
    // }

    // ctx.user = investigator;

    return true;
  }
}
