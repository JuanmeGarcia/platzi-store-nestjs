import {
  PrimaryColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { BasicEntity } from '../../database/base.entity';
import { Customer } from './customer.entity'

@Entity({ name: 'users' })
export class User extends BasicEntity {
  @PrimaryColumn()
  id: number
  @Column({type: 'varchar', length: 35, nullable: false})
  userName: string
  @Column({type: 'varchar', length: 50, nullable: false})
  email: string
  @Column({type: 'varchar', length: 50, nullable: false})
  password: string
  @Column({type: 'varchar', length: 50})
  role: string

  @OneToOne(
    () => Customer,
    (customer: Customer): User => customer.user,
    {
      nullable: true
    }
  )
  @JoinColumn({
    name: 'customer_id',
  })
  customer: Customer
}
