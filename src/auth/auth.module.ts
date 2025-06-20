import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './services/auth.service';
import { UsersModule } from './../users/users.module'
import { LocalStategy } from './stategies/local.stategy'
import { AuthController } from './controllers/auth.controller';
import config from './../config';
import { ConfigType } from '@nestjs/config';
import { JwtStrategy } from './stategies/jtw.strategy';


@Module({
  providers: [
    AuthService,
    LocalStategy,
    JwtStrategy
  ],
  exports: [
    AuthService
  ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [
        config.KEY
      ],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '1d'
          },
        }
      }
    })
  ],
  controllers: [AuthController]
})
export class AuthModule {}
