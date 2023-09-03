import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'
import config from './config';
import type { Client } from 'pg';

export type Task = {
  id: number,
  title: string,
  completed: boolean
}

@Injectable()
export class AppService {

  constructor(
    @Inject('TASKS') private tasks: any[],
    @Inject('PG') private clientPg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}

  getHello(): string {
    const apiKey = this.configService.apikey
    const databaseName = this.configService.database.name
    const databasePort = this.configService.database.port

    return `${databaseName} ${apiKey} ${databasePort}`;
  }

  getTasks(): Promise<Task[]> {
    return this.clientPg.query('SELECT * FROM tasks')
    .then(response => response.rows)
    .catch(err => {
      console.log({
        err: err.message
      });

      throw new Error(err.message)
    })
  }
}
