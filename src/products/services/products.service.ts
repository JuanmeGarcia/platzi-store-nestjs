import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/products.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In, Between, MoreThan, LessThan, FindOptionsWhere } from 'typeorm'
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>
  ) {

  }

  findAll(querys: FilterProductsDto): Promise<Product[]> {
    if(querys) {
      const where: FindOptionsWhere<Product>  = {}
      const {
        limit,
        offset,
        maxPrice,
        minPrice
      } = querys
      if(minPrice) {
        where.price = MoreThan(minPrice)
      }
      if(maxPrice) {
        where.price = LessThan(maxPrice)
      }
      if(minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice)
      }
      return this.productRepository.find({
        relations: ['brand', 'categories'],
        skip: offset,
        take: limit,
        order: {
          id: 'ASC'
        },
        where
      })
    }

    return this.productRepository.find({
      relations: ['brand', 'categories'],
      order: {
        id: 'ASC'
      }
    });
  }
  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      relations: ['brand', 'categories'],
      where: {
        id
      }
    })
    if (!product) {
      Logger.error(`No se ha encontrado el producto con id ${id}`, 'Database')

      throw new NotFoundException(`Product #${id} was not found`)
    }
    return product
  }

  async create(payload: CreateProductDto): Promise<Product> {
    try {
      const newProduct = await this.productRepository.create(payload)

      if(payload.brandId) {
        const brand = await this.brandRepository.findOneBy({
          id: payload.brandId
        })
        newProduct.brand = brand
      }

      if(payload.categoriesIds.length > 0) {
        const categories = await this.categoryRepository.findBy({
          id: In(payload.categoriesIds)
        })
        newProduct.categories = categories
      }

      return this.productRepository.save(newProduct)
    } catch (error) {
      return error.message
    }
  }

  async update(id: number, payload: UpdateProductDto): Promise<Product> {
    try {
    const product = await this.findOne(id);

    if(payload.brandId) {
      const brand = await this.brandRepository.findOneBy({
        id: payload.brandId
      })
      product.brand = brand
    }

    if(payload.categoriesIds.length > 0) {
      console.log({
        msg: 'entra aca en ids'
      });

      const categories = await this.categoryRepository.findBy({
        id: In(payload.categoriesIds)
      })
      product.categories = categories
    }

    this.productRepository.merge(product, payload);

    return this.productRepository.save(product);
    } catch (error) {
      return error
    }
  }

  async removeCategoryByProduct(productId: number, categoryId: number): Promise<boolean> {
    try {
      const product = await this.productRepository.findOne({
        relations: ['categories'],
        where: { id: productId }
      })
      product.categories = product
        .categories
        .filter((category: Category) => (
        category.id !== categoryId
      ))
      this.productRepository.save(product)
      return true
    } catch (error) {
      Logger.error('Hubo un error al momento de borrar', 'Error')
      return false
    }
  }

  async addCategoryToProduct(productId: number, categoryId: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        relations: ['categories'],
        where: { id: productId }
      })

      const category = await this.categoryRepository.findOne({
        where: { id: categoryId }
      })

      if(!category) {
        throw new NotFoundException(`Category #${productId} was not found`)
      }

      product.categories.push(category)
      return this.productRepository.save(product)
    } catch (error) {
      return error.message
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
