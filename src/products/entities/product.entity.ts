import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity({ name: 'products' })
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
  createdAt: Date
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;
}
