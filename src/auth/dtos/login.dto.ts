import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPositive,
  IsOptional
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class CreateAutheticatedUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password
}
