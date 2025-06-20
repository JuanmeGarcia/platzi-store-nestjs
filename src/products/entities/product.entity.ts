import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn
} from 'typeorm';
import {
  Exclude
} from 'class-transformer'

import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity({ name: 'products' })
@Index([
  'price',
  'stock'
])
export class Product {
  @PrimaryGeneratedColumn('increment', {
    type: 'int'
  })
  id: number;
  @Column({
    type: 'varchar',
    length: 255,
    unique: true,
    nullable: false
  })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Index()
  @Column( {type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  @Exclude()
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  @Exclude()
  updatedAt: Date;

  @ManyToOne(
    () => Brand,
    (brand) => brand.products
  )
  @JoinColumn({
    name: 'brand_id'
  })
  brand: Brand;

  @ManyToMany(
    () => Category,
    (category) => category.products
  )
  @JoinTable({
    name: 'products_categories',
    joinColumn: {
      name: 'product_id'
    },
    inverseJoinColumn: {
      name: 'category_id'
    }
  })
  categories: Category[];
}
