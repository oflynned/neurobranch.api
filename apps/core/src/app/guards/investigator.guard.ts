import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ForbiddenError } from 'apollo-server-express';
import { InvestigatorService } from '../investigator/service/investigator.service';

@Injectable()
export class InvestigatorGuard implements CanActivate {
  constructor(
    @Inject('InvestigatorService')
    private readonly investigatorService: InvestigatorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.jwt) {
      throw new BadRequestException('No jwt token included in request');
    }

    const investigator = await this.investigatorService.getInvestigatorByEmail(
      ctx.jwt.email,
    );

    if (!investigator) {
      throw new ForbiddenError('Account does not exist for given jwt');
    }

    ctx.user = investigator;

    return true;
  }
}
