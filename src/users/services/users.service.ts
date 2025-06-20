import { Injectable, Inject, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { User } from 'src/users/entities/user.entity';
import { CustomersService } from './customers.service';
import { Client } from 'pg';
import { Task } from 'src/app.service';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { encryptPassword } from '../../common/utils';

const NOT_FOUND_ERROR = 'Usuario no encontrado'

@Injectable()
export class UsersService {

  constructor(
    private readonly customerService: CustomersService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}


  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['customer']
    })
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      Logger.error(`No se ha encontrado el usuario con id ${id}`, 'Database')
      throw new NotFoundException(NOT_FOUND_ERROR)
    }

    return user
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: { email }
      })
    } catch (error) {
      return error.message
    }
  }

  async create(payload: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.userRepository.create(payload)
      await encryptPassword(newUser)
      if(payload.customerId) {
        const customer = await this.customerService.findOne(payload.customerId)
        if(!customer) {
          throw new NotFoundException('No se ha encontrado el cliente')
        }
        newUser.customer = customer
      }

      return this.userRepository.save(newUser)
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
