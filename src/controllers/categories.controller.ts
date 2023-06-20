import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';

@Controller('categories')
export class CategoriesController {

  @Get('/:categoryId/products/:productId')
  getCategory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string
  ) {
    return {
      message: `The category is ${categoryId} and the product: ${productId}`
    };
  }

  @Post()
  create(
    @Body() payload: any
  ) {
    return {
      message: 'Created!',
      payload
    }
  }


  @Put('/:categoryId')
  update(
    @Param('categoryId') categoryId: string,
    @Body() payload: any
  ) {
    return {
      categoryId,
      payload
    }
  }

  @Delete('/:categoryId')
  delete(
    @Param('categoryId') categoryId: string,
  ) {
    return {
      categoryId,
    }
  }
}
