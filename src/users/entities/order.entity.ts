import { BasicEntity } from '../../database/base.entity';
import { Customer } from "./customer.entity";

import {
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import {
  Exclude,
  Expose
} from 'class-transformer'
import { OrderItem } from "./orderItem.entity";

@Entity({ name: 'orders' })
export class Order extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => Customer,
    (customer) => customer.orders
  )
  @JoinColumn({
    name: 'customer_id'
  })
  customer: Customer;

  @OneToMany(
    () => OrderItem,
    (orderProduct) => orderProduct.order
  )
  @Exclude()
  items: OrderItem[]

  @Expose()
  get products() {
    if(this.items) {
      return this.items
        .filter(item => !!item)
        .map(({
          product: {
            createdAt,
            updatedAt,
            ...product
          },
          ...item
        }) => ({
          ...product,
          quantity: item.quantity,
          itemId: item.id
        }))
    }
    return []
  }

  @Expose()
  get total() {
    if(this.items){
      return this.items
        .filter(item => !!item)
        .reduce((accum, current) => {
          const totalItem = current.product.price * current.quantity
          return totalItem + accum
        }, 0)
    }

    return null
  }
}
