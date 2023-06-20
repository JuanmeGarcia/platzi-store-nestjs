import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete
} from '@nestjs/common';

@Controller('brands')
export class BrandsController {

  @Get()
  getBrands(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return {
      message: `limit: ${limit}, offset: ${offset}`
    };
  }

  @Get('/:brandId')
  getBrand(@Param('brandId') brandId: string) {
    return {
      message: `Brand: ${brandId}`
    };
  }

  @Post()
  create(
    @Body() payload: any
  ) {
    return {
      message: 'Created!',
      payload
    };
  }

  @Put('/:brandId')
  update(
    @Param('brandId') brandId: string,
    @Body() payload: any
  ) {
    return {
      brandId,
      payload
    };
  }

  @Delete('/:brandId')
  delete(
    @Param('brandId') brandId: string,
  ) {
    return {
      brandId,
    };
  }
}
