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
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { CustomersService } from '../services/customers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {

  constructor(private customersService: CustomersService) {}

  @Get()
  getCustomers(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.customersService.findAll();
  }

  @Get('/:customerId')
  getCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customersService.findOne(customerId);
  }

  @Post()
  create(
    @Body() payload: CreateCustomerDto
  ) {
    return this.customersService.create(payload);
  }

  @Put('/:customerId')
  update(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() payload: UpdateCustomerDto
  ) {
    return this.customersService.update(customerId, payload);
  }

  @Delete('/:customerId')
  delete(
    @Param('customerId', ParseIntPipe) customerId: number,
  ) {
    return this.customersService.delete(customerId);
  }
}
