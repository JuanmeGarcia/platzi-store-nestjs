import * as Joi from 'joi'


export const configSchema = Joi.object({
  API_KEY: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5433),
  POSTGRES_HOST: Joi.string().hostname().required(),
})
