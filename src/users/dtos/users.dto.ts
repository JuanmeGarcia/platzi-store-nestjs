import {
  IsString,
  IsNotEmpty,
  IsEmail
} from 'class-validator'

import { PartialType } from '@nestjs/mapped-types'


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly userName: string

  @IsEmail()
  @IsNotEmpty()
  readonly email: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
