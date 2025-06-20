import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Controller('orders')
export class OrdersController {

  constructor(
    private readonly ordersService: OrdersService
  ) {

  }

  @Get()
  getOrders() {
    return this.ordersService.findAll()
  }

  @Get(':id')
  getOrder(
    @Param('id', ParseIntPipe) id: number
  ){
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto){
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id:number,
    @Body() payload: UpdateOrderDto
  ){
    return this.ordersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number){
    return this.ordersService.delete(id);
  }
}

