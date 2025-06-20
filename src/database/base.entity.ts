import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {
  Exclude
} from 'class-transformer'

export class BasicEntity {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Exclude()
  updatedAt: Date;
}

