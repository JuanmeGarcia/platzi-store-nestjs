import {
  PrimaryGeneratedColumn,
  Column,
  Entity
} from 'typeorm';
import { BasicEntity } from '../../database/base.entity';

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
}
