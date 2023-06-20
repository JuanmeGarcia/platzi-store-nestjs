import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete
} from '@nestjs/common';

@Controller('orders')
export class OrdersController {

  @Get()
  getOrders(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return {
      message: `limit: ${limit}, offset: ${offset}`
    };
  }

  @Get('/:orderId')
  getOrder(@Param('orderId') orderId: string) {
    return {
      message: `Order: ${orderId}`
    };
  }

  @Post()
  create(
    @Body() payload: any
  ) {
    return {
      message: 'Created!',
      payload
    }
  }

  @Put('/:orderId')
  update(
    @Param('orderId') orderId: string,
    @Body() payload: any
  ) {
    return {
      orderId,
      payload
    }
  }

  @Delete('/:orderId')
  delete(
    @Param('orderId') orderId: string,
  ) {
    return {
      orderId,
    }
  }
}
