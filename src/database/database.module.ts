import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { Client } from 'pg';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm'
const API_KEY = '1234567890'
const API_KEY_PROD = 'PROD1234567890'



@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          dbName,
          user,
          port,
          password,
          host
        } = configService.postgres

        return {
          type: 'postgres',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true
        }
      }
    })
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'production'
        ? API_KEY_PROD
        : API_KEY
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const {
          dbName,
          user,
          port,
          password,
          host
        } = configService.postgres
        const client: Client = new Client({
          database: dbName,
          user,
          port,
          password,
          host
        });

        client.connect();
        return client;
      },
      inject: [config.KEY]
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule]
})
export class DatabaseModule {}
