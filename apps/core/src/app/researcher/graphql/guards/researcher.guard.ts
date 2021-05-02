import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ResearcherService } from '../../service/researcher.service';
import { AuthenticationError } from 'apollo-server-express';

@Injectable()
export class ResearcherGuard implements CanActivate {
  constructor(private readonly researcherService: ResearcherService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    if (!ctx.jwt) {
      throw new AuthenticationError('No jwt context set');
    }

    const researcher = await this.researcherService.getResearcherByEmail(
      ctx.jwt.email,
    );

    if (!researcher) {
      throw new UnauthorizedException('Jwt does not belong to a researcher');
    }

    ctx.user = researcher;

    return true;
  }
}
