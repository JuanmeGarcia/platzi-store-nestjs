import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany
} from 'typeorm';
import { BasicEntity } from '../../database/base.entity';
import { Product } from './product.entity';


@Entity({ name: 'categories' })
export class Category extends BasicEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({
    type: 'varchar',
    length: 40,
    nullable: false,
    unique: true
  })
  name: string
  @ManyToMany(
    () => Product,
    (product) => product.categories
  )
  products: Product[]
}
