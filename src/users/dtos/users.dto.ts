import {
  IsString,
  IsNotEmpty,
  IsEmail
} from 'class-validator'
import { PartialType, ApiProperty } from '@nestjs/swagger'


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Username fictional name"
  })
  readonly userName: string

  @IsEmail()
  @IsNotEmpty()
  readonly email: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
