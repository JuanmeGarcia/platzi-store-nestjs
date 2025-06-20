import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';
import { Customer } from '../entities/customer.entity';

const NOT_FOUND_ERROR = 'No se ha encontrado la orden'

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>
  ) { }

  async findOne(id: number): Promise<Order> {
    const order = this.orderRepository.findOne({
      relations: ['customer', 'items.product'],
      where: { id }
    })

    if(!order) {
      Logger.error('No se ha encontrado la orden', 'Not found')
      throw new NotFoundException(NOT_FOUND_ERROR)
    }

    return order
  }

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderRepository.find()
    } catch (error) {
      Logger.error(error)
      return error.message
    }
  }

  async create(payload: CreateOrderDto): Promise<Order> {
    try {
      const { customerId } = payload
      const newOrder = new Order()
      if(customerId) {
        const customer = await this.customerRepository.findOne({
          where: { id: customerId }
        })
        newOrder.customer = customer
      }

      return this.orderRepository.save(newOrder)
    } catch (error) {
      Logger.error(error.message)
      return error.message
    }
  }

  async update(id: number, payload: UpdateOrderDto): Promise<Order> {
    try {
      const { customerId } = payload

      const order = await this.findOne(id)

      if(customerId) {
        const customer = await this.customerRepository.findOne({
          where: { id: customerId }
        })
        order.customer = customer
      }
      return this.orderRepository.save(order)
    } catch (error) {
      Logger.error(error.message)
      return error.message
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      const order = await this.findOne(id)
      await this.orderRepository.delete(order)
      return true
    } catch (error) {
      Logger.error(error.message)
      return false
    }
  }
}
