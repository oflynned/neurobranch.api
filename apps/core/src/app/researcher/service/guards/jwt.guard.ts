import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FirebaseService } from '../../../../../../../libs/firebase/src';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { uid, jwt } = this.firebaseService.parseHeaders(ctx.req.headers);

    try {
      ctx.jwt = await this.firebaseService.verifyJwt(uid, jwt);
      return true;
    } catch (e) {
      return false;
    }
  }
}
