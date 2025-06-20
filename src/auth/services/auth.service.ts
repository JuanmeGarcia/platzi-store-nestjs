import { Injectable } from '@nestjs/common';
import { isPasswordEqual } from 'src/common/utils';
import { UsersService } from 'src/users/services/users.service';
import { CreateAutheticatedUserDto } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt'
import { User } from './../../users/entities/user.entity';
import { PayloadToken } from '../models/token.model';


@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UsersService,
    private readonly jwt: JwtService
  ) {}

    async validateUser(login: CreateAutheticatedUserDto) {
      const user = await this.userService.findByEmail(login.email)
      if(!user) {
        return null
      }

      const isEqual = await isPasswordEqual(login.password, user)
      if(!isEqual) {
        return null
      }

      return user
    }

    async generateJwt(user: User) {
      const payload: PayloadToken = {
        role: user.role,
        sub: user.id
      }
      return {
        access_token: this.jwt.sign(payload),
        user
      }
    }
}
