import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { Customer } from '../entities/customer.entity';
import { getIndex, getOne } from 'src/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const NOT_FOUND_ERROR = 'Cliente no encontrado'

@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>
  ){}

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find()
  }

  async findOne(id: number): Promise<Customer> {
    const customer = this.customerRepository.findOneBy({ id })

    if (!customer) { throw new NotFoundException(NOT_FOUND_ERROR) }
    return customer
  }

  async create(payload: CreateCustomerDto): Promise<Customer> {
    try {
      const newCustomer = await this.customerRepository.create(payload)
      return await this.customerRepository.save(newCustomer)
    } catch (error) {
      return error.message
    }
  }

  async update(id: number, payload: UpdateCustomerDto) {
    try {
      const customer = await this.findOne(id)
      await this.customerRepository.merge(customer, payload)
      return await this.customerRepository.save(customer)
    } catch (error) {
      return error.message
    }
  }

  async delete(id): Promise<boolean> {
    try {
      await this.findOne(id)
      await this.customerRepository.delete(id)
      return true
    } catch (error) {
      return false
    }
  }
}
