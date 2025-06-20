import {
  IsNotEmpty,
  IsNumber
} from 'class-validator'
import { PartialType, ApiProperty } from '@nestjs/swagger'

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly customerId: number
}


export class UpdateOrderDto extends PartialType(CreateOrderDto) {

}
