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
import { ProductsService } from 'src/products/services/products.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {
  }

  @Get('/')
  @ApiOperation({
    summary:'List the products from the database'
  })
  getProducts(
  ) {
    // return {
    //   message: `Products: limit => ${limit}, offset => ${offset}BRAND: ${brand}`
    // }
    return this.productsService.findAll()
      .then(res => res)
      .catch(err => {
        console.log(err);
        return 'Hubo un error'
      })
  }

  @Get('/filter')
  getProductFilter() {
    return {
      message: `Yo soy un filter`
    };
  }

  @Get('/:productId')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId)
      .then(res => res)
      .catch(err => {
        console.log(err);
        return 'Hubo un error'
      })
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
    @Param('productId', ParseIntPipe) productId: number,
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
    return this.productsService.update(productId, payload)

  }

  @Delete('/:productId')
  delete(
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productsService.delete(productId)
  }
}
