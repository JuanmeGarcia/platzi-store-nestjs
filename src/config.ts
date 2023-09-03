import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
    return {
      database: {
        name: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT,
        hostname: process.env.POSTGRES_HOST,
      },
      postgres: {
        dbName: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        port: parseInt(process.env.POSTGRES_PORT),
        host: process.env.POSTGRES_HOST
      },
      apikey: process.env.API_KEY
  }
})
