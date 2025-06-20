import { CanActivate, ExecutionContext, Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { ConfigType } from '@nestjs/config';
import config from './../../config'
import { IS_PUBLIC_KEY } from '../decorators';

@Injectable()
export class ApiKeyGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
    ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector
      .get(
        IS_PUBLIC_KEY,
        context.getHandler()
      )
    if(isPublic) {
      return true
    }
    const request = context
      .switchToHttp()
      .getRequest<Request>()

    const authHeader = request.header('Auth')
    const isAuthenticated =  authHeader === this.configService.apikey;
    if(!isAuthenticated) {
      throw new UnauthorizedException('Not allowed')
    }
    return isAuthenticated
  }
}
