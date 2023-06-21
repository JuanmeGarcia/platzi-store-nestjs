import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';
import { Category } from 'src/products/entities/category.entity';
import { getIndex, getOne } from 'src/utils';

@Injectable()
export class CategoriesService {
  private counterId = 1
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
    }
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const product = getOne(id, this.categories, 'Category')
    return product
  }

  create(payload: CreateCategoryDto) {
    this.counterId+=1
    const newCategory = {
      id: this.counterId,
      ...payload
    }

    this.categories.push(newCategory)

    return newCategory
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id)

    if(!category) { return null}

    Object.assign(category, payload)
    return category
  }

  delete(id) {
    const index = getIndex(id, this.categories, 'Category')
    this.categories.splice(index, 1)
    return true
  }
}
