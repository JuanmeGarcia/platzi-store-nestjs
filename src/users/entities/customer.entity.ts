import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  OneToMany
} from 'typeorm';
import { BasicEntity } from '../../database/base.entity';
import { User } from './user.entity'
import { Order } from './order.entity';

@Entity({ name: 'customers' })
export class Customer extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({type: 'varchar', length: 50, nullable: false})
  firstName: string;
  @Column({type: 'varchar', length: 50, nullable: false})
  lastName: string;
  @Column({type: 'varchar', nullable: false})
  phoneNumber: string;
  @OneToOne(
    () => User,
    (user) => user.customer,
    {
      nullable: true
    }
  )
  user: User
  @OneToMany(
    () => Order,
    (order) => order.customer
  )
  orders: Order[]
}
