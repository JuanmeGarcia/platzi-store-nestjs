import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common';
import { AppService, Task } from './app.service';
import { ApiKeyGuard } from './auth/guards';
import { Public } from './auth/decorators';


@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/nuevo')
  nuevo(): string {
    return this.appService.getHello();
  }

  @Get('/nuevo/2')
  nuevo2(): string {
    return this.appService.getHello();
  }

  @Public()
  @Get('/tasks')
  getTasks(): Promise<Task[]> {
    return this.appService.getTasks()
  }
}
