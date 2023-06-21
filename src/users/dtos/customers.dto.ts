import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber
} from 'class-validator'
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phoneNumber: string
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
