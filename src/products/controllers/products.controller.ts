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
  UseGuards
} from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/products.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard, RolesGuard } from '../../auth/guards'
import { Public } from '../../auth/decorators'
import { Roles } from '../../auth/decorators';
import { Role } from '../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService) {
  }

  @Public()
  @Get('/')
  @ApiOperation({
    summary:'List the products from the database'
  })
  getProducts(
    @Query() querys: FilterProductsDto,
  ) {

    // return {
    //   message: `Products: limit => ${limit}, offset => ${offset}BRAND: ${brand}`
    // }
    return this.productsService.findAll(querys)
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

  @Public()
  @Get('/:productId')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId)
      .then(res => res)
      .catch(err => {
        return err.response
      })
  }

  @Roles(Role.ADMIN)
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

  @Put(':id/categories/:categoryId')
  addCategoryToProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) caategoryId: number
  ) {
    return this.productsService
      .addCategoryToProduct(id, caategoryId)
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

  @Delete(':id/categories/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) caategoryId: number
  ) {
    return this.productsService
      .removeCategoryByProduct(id, caategoryId)
  }
}
