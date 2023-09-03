import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';
import { Order } from '../entities/order.entity';
import { getIndex, getOne } from 'src/utils';
import { ProductsService } from 'src/products/services/products.service';
import { Client } from 'pg';
import { Task } from 'src/app.service';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';

const NOT_FOUND_ERROR = 'Usuario no encontrado'

@Injectable()
export class UsersService {

  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}


  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) { throw new NotFoundException(NOT_FOUND_ERROR) }

    return user
  }

  async create(payload: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.userRepository.create(payload)
      return await this.userRepository.save(newUser)
    } catch (error) {
      return error.message
    }
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id)

      await this.userRepository.merge(user, payload)
      return await this.userRepository.save(user)
    } catch (error) {
      return error.message
    }
  }

  async delete(id): Promise<boolean> {
    try {
      await this.findOne(id)
      await this.userRepository.delete(id)

      return true
    } catch (error) {
      return false
    }
  }

  async getOrdersByUser(id: number): Promise<Order> {
    const user = await this.findOne(id)
    const products = await this.productsService.findAll()
    return {
      id,
      date: new Date(),
      user,
      products
    }
  }

  getTasks(): Promise<Task[]> {
    return this.clientPg.query('SELECT * FROM tasks')
    .then(response => response.rows)
    .catch(err => {
      console.log({
        err: err.message
      });

      throw new Error(err.message)
    })
  }
}
