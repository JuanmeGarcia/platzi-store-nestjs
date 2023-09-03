import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([
      Customer,
      Order,
      User
    ])
  ],
  controllers: [
    UsersController,
    CustomersController
  ],
  providers: [
    UsersService,
    CustomersService
  ]
})
export class UsersModule {}
