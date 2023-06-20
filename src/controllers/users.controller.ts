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

@Controller('users')
export class UsersController {

  @Get()
  getUsers(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return {
      message: `limit: ${limit}, offset: ${offset}`
    };
  }

  @Get('/:userId')
  getUser(@Param('userId') userId: string) {
    return {
      message: `User: ${userId}`
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

  @Put('/:userId')
  update(
    @Param('userId') userId: string,
    @Body() payload: any
  ) {
    return {
      userId,
      payload
    }
  }

  @Delete('/:userId')
  delete(
    @Param('userId') userId: string,
  ) {
    return {
      userId,
    }
  }
}
