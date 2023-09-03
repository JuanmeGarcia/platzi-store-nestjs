import {
  PrimaryColumn,
  Column,
  Entity,
  OneToOne
} from 'typeorm';
import { BasicEntity } from '../../database/base.entity';
import { User } from './user.entity'

@Entity({ name: 'customers' })
export class Customer extends BasicEntity {
  @PrimaryColumn()
  id: number;
  @Column({type: 'varchar', length: 50, nullable: false})
  firstName: string;
  @Column({type: 'varchar', length: 50, nullable: false})
  lastName: string;
  @Column({type: 'int', nullable: false})
  phoneNumber: string;
  @OneToOne(
    () => User,
    (user) => user.customer,
    {
      nullable: true
    }
  )
  user: User
}
