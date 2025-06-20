import { BasicEntity } from '../../database/base.entity';
import { Product } from "../../products/entities/product.entity";
import { Order } from "./order.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";



@Entity({ name: 'orders_products' })
export class OrderItem extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int'
  })
  quantity: number

  @ManyToOne(
    () => Product,
  )
  @JoinColumn({
    name: 'product_id'
  })
  product: Product

  @ManyToOne(
    () => Order,
    (order) => order.items,
  )
  @JoinColumn({
    name: 'order_id'
  })
  order: Order;
}
