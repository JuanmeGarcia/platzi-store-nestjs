import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { getIndex, getOne } from 'src/utils';


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
    const product = getOne(id, this.products, 'Product')
    return product
  }

  create(payload: CreateProductDto) {
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
    const index = getIndex(id, this.products, 'Product')
    this.products.splice(index, 1)
    return true
  }
}
