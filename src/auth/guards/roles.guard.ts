import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from '../decorators';
import { Role } from '../models/roles.model';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector
  ) {

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get<Role[]>(
      ROLES, context.getHandler()
    )

    if(!roles) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user as PayloadToken

    const isAuth = roles.some(role => role === user.role)

    if(!isAuth){
      throw new ForbiddenException('Role is not permitted for this action')
    }

    return true;
  }
}
