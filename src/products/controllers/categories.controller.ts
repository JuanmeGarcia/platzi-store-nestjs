import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateCategoryDto } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {

  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories() {
    return this.categoriesService.findAll()
  }

  @Get('/:categoryId')
  findOne(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.categoriesService.findOne(categoryId)
  }

  @Get('/:categoryId/products/:productId')
  getCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('productId', ParseIntPipe) productId: number
  ) {
    return {
      message: `The category is ${categoryId} and the product: ${productId}`
    };
  }

  @Post()
  create(
    @Body() payload: CreateCategoryDto
  ) {
    return this.categoriesService.create(payload)
  }


  @Put('/:categoryId')
  update(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() payload: CreateCategoryDto
  ) {
    return this.categoriesService.update(categoryId, payload)
  }

  @Delete('/:categoryId')
  delete(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.categoriesService.delete(categoryId)
  }
}
