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

@Controller('customers')
export class CustomersController {

  @Get()
  getCustomers(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return {
      message: `limit: ${limit}, offset: ${offset}`
    };
  }

  @Get('/:customerId')
  getCustomer(@Param('customerId') customerId: string) {
    return `Customer: ${customerId}`
  }

  @Post()
  create(
    @Body() payload: any
  ) {
    return {
      messsage: 'Created!',
      payload
    }
  }

  @Put('/:customerId')
  update(
    @Param('customerId') customerId: string,
    @Body() payload: any
  ) {
    return {
      customerId,
      payload
    }
  }

  @Delete('/:customerId')
  delete(
    @Param('customerId') customerId: string,
  ) {
    return {
      customerId,
    }
  }
}
