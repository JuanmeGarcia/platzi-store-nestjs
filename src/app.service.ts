import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'
import config from './config';

@Injectable()
export class AppService {

  constructor(
    @Inject('TASKS') private tasks: any[],
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}

  getHello(): string {
    const apiKey = this.configService.apikey
    const databaseName = this.configService.database.name
    const databasePort = this.configService.database.port

    return `${databaseName} ${apiKey} ${databasePort}`;
  }
}
