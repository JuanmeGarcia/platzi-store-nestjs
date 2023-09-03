import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/products/dtos/brands.dto';
import { Brand } from '../entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const NOT_FOUND_ERROR = 'Marca no encontrada'

@Injectable()
export class BrandsService {

  constructor(
    @InjectRepository(Brand) private readonly brandRepository: Repository<Brand>
  ) {}

  async findAll(): Promise<Brand[]> {
    try {
      return await this.brandRepository.find()
    } catch (error) {
      console.log({error: error.message});
      return error.message
    }
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOneBy({id})

    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }

    return brand;
  }

  async create(data: CreateBrandDto): Promise<Brand> {
    try {
      const newBrand = await this.brandRepository.create(data)
      return await this.brandRepository.save(newBrand)
    } catch (error) {
      console.log({error: error.message});
      return error.message
    }
  }

  async update(id: number, changes: UpdateBrandDto): Promise<Brand> {
    try {
      const brand = await this.findOne(id);

      await this.brandRepository.merge(brand, changes)
      return await this.brandRepository.save(brand)
    } catch (error) {
      console.log({error: error.message});
      return error.message
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.findOne(id)

      await this.brandRepository.delete(id)
      return true
    } catch (error) {
      console.log({error: error.message});
      return false
    }
  }
}
