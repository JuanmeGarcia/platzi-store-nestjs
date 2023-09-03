import {
  PrimaryGeneratedColumn,
  Column,
  Entity
} from 'typeorm';
import { BasicEntity } from '../../database/base.entity';


@Entity({ name: 'categories' })
export class Category extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({
    type: 'varchar',
    length: 40,
    nullable: false
  })
  name: string
}
