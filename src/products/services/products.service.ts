import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {

  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({id})
    if (!product) {
      throw new NotFoundException(`Product #${id} was not found`)
    }
    return product
  }

  async create(payload: CreateProductDto): Promise<Product> {
    try {
      const newProduct = await this.productRepository.create(payload)
      return this.productRepository.save(newProduct)
    } catch (error) {
      return error.message
    }
  }

  async update(id: number, payload: UpdateProductDto) {
    try {
    const product = await this.findOne(id);

    this.productRepository.merge(product, payload);

    return this.productRepository.save(product);
    } catch (error) {
      return error
    }
  }

  async delete(id): Promise<boolean> {
    try {
      await this.findOne(id)

      await this.productRepository.delete(id)
      return true
    } catch (error) {
      console.log({error: error.message});
      return false
    }
  }
}
