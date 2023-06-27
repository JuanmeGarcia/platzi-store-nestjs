import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive
} from 'class-validator'

import { PartialType } from '@nestjs/swagger'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber({}, {message: "Debe ser un numero"})
  @IsNotEmpty()
  @IsPositive()
  readonly price: number

  @IsNumber({}, {message: "Debe ser un numero"})
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string
}


export class UpdateProductDto extends PartialType(CreateProductDto) {

}
