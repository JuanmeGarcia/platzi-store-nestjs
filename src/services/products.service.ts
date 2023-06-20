import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';


@Injectable()
export class ProductsService {
  private counterId = 1
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'soda drink',
      price: 333,
      stock: 15,
      image: ''
    }
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find(item => item.id === id)
    if(!product) {
      throw new NotFoundException(`Product #${id} not found`)
    }

    return product
  }

  create(payload: CreateProductDto) {
    console.log(payload);

    this.counterId+=1
    const newProduct = {
      id: this.counterId,
      ...payload
    }

    this.products.push(newProduct)

    return newProduct
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id)

    if(!product) { return null}

    Object.assign(product, payload)
    return product
  }

  delete(id) {
    const index = this.products.findIndex(product => (
      product.id === id
    ))
    if(index < 0) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1)
    return true
  }
}
