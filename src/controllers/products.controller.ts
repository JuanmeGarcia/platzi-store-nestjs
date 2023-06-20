import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  // ParseIntPipe
  // Res
} from '@nestjs/common';
import { Response } from 'express'
import { ProductsService } from 'src/services/products.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';

@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {
  }

  @Get('/')
  getProducts(
    @Query('limit') limit: number = 100,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string
  ) {
    // return {
    //   message: `Products: limit => ${limit}, offset => ${offset}BRAND: ${brand}`
    // }
    return this.productsService.findAll()
  }

  @Get('/filter')
  getProductFilter() {
    return {
      message: `Yo soy un filter`
    };
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    // return {
    //   message: `Product: ${productId}`
    // };

    return this.productsService.findOne(productId)
  }

  @Post()
  createProduct(
    @Body() payload: CreateProductDto
  ) {
    // return {
    //   message: 'created!',
    //   payload
    // }

    return this.productsService.create(payload)
  }

  @Put('/:productId')
  update(
    // @Res() response: Response,
    @Param('productId') productId: number,
    @Body() payload: UpdateProductDto
  ) {
    // response.status(200).json({
    //   lol: true,
    //   productId,
    //   payload
    // })
    // return {
    //   productId,
    //   payload
    // }
    console.log(productId, payload)
    return this.productsService.update(Number(productId), payload)

  }

  @Delete('/:productId')
  delete(
    @Param('productId') productId: number,
  ) {
    return this.productsService.delete(Number(productId))
  }
}
