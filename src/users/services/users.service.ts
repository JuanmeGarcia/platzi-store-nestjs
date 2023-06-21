import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';
import { Order } from '../entities/order.entity';
import { getIndex, getOne } from 'src/utils';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {

  constructor(
    private productsService: ProductsService,
    private configService: ConfigService
    ) {}

  private counterId = 1
  private users: User[] = [
    {
      id: 1,
      userName: 'xXJuanmesit0Xx',
      email: 'asd@asd.com'
    }
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const product = getOne(id, this.users, 'User')
    const databaseName = this.configService.get('DATABASE_NAME')

    console.log(databaseName);

    return product
  }

  create(payload: CreateUserDto) {
    this.counterId+=1
    const newUser = {
      id: this.counterId,
      ...payload
    }

    this.users.push(newUser)

    return newUser
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id)

    if(!user) { return null}

    Object.assign(user, payload)
    return user
  }

  delete(id) {
    const index = getIndex(id, this.users, 'User')
    this.users.splice(index, 1)
    return true
  }

  getOrdersByUser(id: number): Order {
    const user = this.findOne(id)
    const products = this.productsService.findAll()
    return {
      date: new Date(),
      user,
      products
    }
  }
}
