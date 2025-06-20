import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany
} from 'typeorm';
import { BasicEntity } from '../../database/base.entity';
import { Product } from './product.entity';

@Entity({ name: 'brands' })
export class Brand extends BasicEntity {
  @PrimaryGeneratedColumn('increment', {
    type: 'int'
  })
  id: number;

  @Column({type: 'varchar', length: 40, nullable: false})
  name: string;
  @Column({type: 'varchar', length: 255, nullable: true})
  image: string;

  @OneToMany(
    () => Product,
    (product) => product.brand
  )
  products: Product[]
}
