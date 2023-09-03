import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from '../entities/category.entity';
import { getIndex, getOne } from 'src/utils';
import { InjectRepository } from '@nestjs/typeorm'
import type { Repository } from 'typeorm'

const NOT_FOUND_ERROR = 'Categoria no encontrada'

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ){}

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find()
    } catch (error) {
      console.log({error: error.message});
      throw new Error(error.message)
    }
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id })
    if (!category) { throw new NotFoundException(NOT_FOUND_ERROR) }

    return category
  }

  async create(payload: CreateCategoryDto): Promise<Category> {
    try {
      const newCategory = await this.categoryRepository.create(payload)
      return this.categoryRepository.save(newCategory)
    } catch (error) {
      console.log({error: error.message});
      throw new Error(error.message)
    }
  }

  async update(id: number, payload: UpdateCategoryDto): Promise<Category> {
    try {
      const category = await this.findOne(id)

      if(!category) { throw new NotFoundException(NOT_FOUND_ERROR) }
      this.categoryRepository.merge(category, payload)
      return this.categoryRepository.save(category)
    } catch (error) {
      console.log({error: error.message});
      throw new Error(error.message)
    }
  }

  async delete(id): Promise<boolean> {
    try {
      const category = await this.findOne(id)

      if(!category) { throw new NotFoundException(NOT_FOUND_ERROR) }
      await this.categoryRepository.delete(category)
      return true
    } catch (error) {
      console.log({error: error.message});
      return false
    }
  }
}
