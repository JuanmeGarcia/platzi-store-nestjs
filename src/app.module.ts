import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as Joi from 'joi'

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';
import { configSchema } from './configSchema';

const URL = 'https://jsonplaceholder.typicode.com/todos'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: configSchema
    }),
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get(URL)
        const tasks = await firstValueFrom(request)
        return tasks.data
      },
      inject: [HttpService]
    }
  ],
})
export class AppModule { }
