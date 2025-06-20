import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from '../entities/orderItem.entity';
import { Product } from '../../products/entities/product.entity';
import { Order } from '../entities/order.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/orderItem.dto';


@Injectable()
export class OrderItemsService {

  constructor(
    @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) { }

  async findOne(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id }
    })

    if(!orderItem) {
      Logger.error('No se ha encontrado el item')
      throw new NotFoundException('No se ha encontrado la orden')
    }

    return orderItem
  }


  async create(payload: CreateOrderItemDto): Promise<OrderItem> {
    try {
      const { orderId, productId } = payload
      const order = await this.orderRepository.findOne({
        where: { id: orderId }
      })

      if(!order) {
        Logger.error('No se ha encontrado la orden')
        throw new NotFoundException('No se ha encontrado la orden')
      }

      const product = await this.productRepository.findOne({
        where: { id: productId }
      })
      if(!product) {
        Logger.error('No se ha encontrado el producto')
        throw new NotFoundException('No se ha encontrado el producto')
      }

      const item = new OrderItem()
      item.order = order
      item.product = product
      item.quantity = payload.quantity

      return this.orderItemRepository.save(item)

    } catch (error) {
      Logger.error(error.message)
      return error.message
    }
  }

  async update(id: number, payload: UpdateOrderItemDto): Promise<OrderItem> {
    try {
      const {
        quantity,
        productId,
        orderId
      } = payload
      const item = await this.findOne(id)

      const product = await this.productRepository.findOne({
        where: { id: productId }
      })

      if(!product) {
        throw new NotFoundException('No se ha encontrado el producto')
      }
      item.product = product

      if(quantity) {
        item.quantity = quantity
      }

      const order = await this.orderRepository.findOne({
        where: { id: orderId }
      })

      if(!order) {
        throw new NotFoundException('No se ha encontrado la orden')
      }
      item.order = order

      return this.orderItemRepository.save(item)
    } catch (error) {
      Logger.error(error.message)
      return error.message
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.findOne(id)
      await this.orderItemRepository.delete(id)

      return true
    } catch (error) {
      Logger.error(error.message)
      return false
    }
  }
}
