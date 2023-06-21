import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { firstValueFrom } from 'rxjs';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';

const URL = 'https://jsonplaceholder.typicode.com/todos'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true
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
