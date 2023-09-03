import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService, Task } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/tasks')
  getTasks(): Promise<Task[]> {
    return this.appService.getTasks()
  }
}
