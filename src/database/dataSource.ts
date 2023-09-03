import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  username: 'root',
  password: 'root',
  host: 'localhost',
  port: 5433,
  database: 'postgres',
  synchronize: false,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
})
