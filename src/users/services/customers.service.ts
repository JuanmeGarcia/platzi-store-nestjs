import { Injectable } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { Customer } from '../entities/customer.entity';
import { getIndex, getOne } from 'src/utils';

@Injectable()
export class CustomersService {
  private counterId = 1
  private customers: Customer[] = [
    {
      id: 1,
      firstName: 'Juan',
      lastName: 'Garcia Carballo',
      phoneNumber: '12321313123'
    }
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const product = getOne(id, this.customers, 'Customer')
    return product
  }

  create(payload: CreateCustomerDto) {
    this.counterId+=1
    const newCustomer = {
      id: this.counterId,
      ...payload
    }

    this.customers.push(newCustomer)

    return newCustomer
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id)

    if(!customer) { return null}

    Object.assign(customer, payload)
    return customer
  }

  delete(id) {
    const index = getIndex(id, this.customers, 'Customer')
    this.customers.splice(index, 1)
    return true
  }
}
