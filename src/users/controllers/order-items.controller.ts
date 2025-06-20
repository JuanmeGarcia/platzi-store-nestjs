import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/orderItem.dto';
import { OrderItemsService } from '../services/order-items.service';

@Controller('order-items')
export class OrderItemsController {

  constructor(
    private readonly orderItemService: OrderItemsService
  ) {

  }

  @Post()
  create(@Body() payload: CreateOrderItemDto) {
    return this.orderItemService.create(payload)
  }

  @Put('/:itemId')
  update(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() payload: UpdateOrderItemDto
  ) {
    return this.orderItemService.update(itemId, payload)
  }

  @Delete('/:itemId')
  delete(
    @Param('itemId', ParseIntPipe) itemId: number
  ) {
    return this.orderItemService.delete(itemId)
  }
}
