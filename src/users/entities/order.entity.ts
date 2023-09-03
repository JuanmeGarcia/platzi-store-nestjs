import { Product } from "src/products/entities/product.entity";
import { User } from "./user.entity";

import {
  PrimaryGeneratedColumn,
  Column,
  Entity
} from 'typeorm';

// @Entity({ name: 'orders' })
export class Order {
  // @PrimaryGeneratedColumn()
  id: number
  // @Column('date')
  date: Date;
  // @Column()
  user: User;
  // @Column()
  products: Product[]
}
