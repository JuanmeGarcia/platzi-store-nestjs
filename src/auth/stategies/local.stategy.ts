import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from './../services/auth.service'
import { Strategy } from 'passport-local'
import { CreateAutheticatedUserDto } from '../dtos/login.dto'

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy, 'local') {

  constructor(
    private readonly authService: AuthService
  ) {
    super({
      usernameField: 'email'
    })
  }

  async validate(email: string, password: string) {
    const login = new CreateAutheticatedUserDto()

    login.email = email
    login.password = password

    const user = await this.authService.validateUser(login)

    if(!user) {
      throw new UnauthorizedException('Not allowed')
    }

    return user
  }
}
