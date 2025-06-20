import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  ArrayMinSize,
  IsOptional,
  Min,
} from 'class-validator'

import { ApiProperty, PartialType } from '@nestjs/swagger'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber({}, {message: "Debe ser un numero"})
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number

  @IsNumber({}, {message: "Debe ser un numero"})
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsNumber({}, {
    each: true
  })
  readonly categoriesIds: number[]

}


export class UpdateProductDto extends PartialType(CreateProductDto) {

}


export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number

  @IsOptional()
  @Min(0)
  offset: number

  @IsOptional()
  @IsPositive()
  minPrice: number

  @IsOptional()
  @IsPositive()
  maxPrice: number
}
