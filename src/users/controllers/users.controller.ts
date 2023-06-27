import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { UsersService } from 'src/users/services/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.usersService.findAll()
  }

  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.findOne(userId)
  }

  @Get('/:userId/orders')
  getUserOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getOrdersByUser(userId)
  }


  @Post()
  create(
    @Body() payload: CreateUserDto
  ) {
    return this.usersService.create(payload)
  }

  @Put('/:userId')
  update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto
  ) {
    return this.usersService.update(userId, payload)
  }

  @Delete('/:userId')
  delete(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.usersService.delete(userId)
  }
}
