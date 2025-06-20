import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPositive,
  IsOptional
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
  @ApiProperty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly role: string

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
