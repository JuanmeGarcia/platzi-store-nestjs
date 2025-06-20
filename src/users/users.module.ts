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
import { OrderItem } from './entities/orderItem.entity';
import { OrderItemsService } from './services/order-items.service';
import { OrderItemsController } from './controllers/order-items.controller';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([
      Customer,
      Order,
      User,
      OrderItem
    ])
  ],
  controllers: [
    UsersController,
    CustomersController,
    OrderItemsController,
    OrdersController
  ],
  providers: [
    UsersService,
    CustomersService,
    OrderItemsService,
    OrdersService
  ],
  exports : [
    UsersService
  ]
})
export class UsersModule {}
