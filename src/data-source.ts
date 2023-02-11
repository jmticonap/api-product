import { DataSource } from 'typeorm'
import { getCheckedEnvParams } from './helpers'

import { ProductEntity } from './entities/product.entity'
import { CategoryEntity } from './entities/category.entity'

import * as dotenv from 'dotenv'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

const nodeEnv: string = getCheckedEnvParams('NODE_ENV')
if (['DEV', 'TEST'].includes(nodeEnv)) {
  dotenv.config()
}

const host: string = getCheckedEnvParams(nodeEnv === 'TEST' ? 'TEST_DB_HOSTNAME' : 'DB_HOSTNAME')
const port: number = +getCheckedEnvParams(nodeEnv === 'TEST' ? 'TEST_DB_PORT' : 'DB_PORT')
const username: string = getCheckedEnvParams(nodeEnv === 'TEST' ? 'TEST_DB_USERNAME' : 'DB_USERNAME')
const password: string = getCheckedEnvParams(nodeEnv === 'TEST' ? 'TEST_DB_PASSWORD' : 'DB_PASSWORD')
const database: string = getCheckedEnvParams(nodeEnv === 'TEST' ? 'TEST_DB_NAME' : 'DB_NAME')

export const dsoPostgres: PostgresConnectionOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: nodeEnv !== 'PROD',
  dropSchema: nodeEnv !== 'PROD',
  poolSize: 10,
  entities: [
    ProductEntity,
    CategoryEntity
  ]
}

export const PostgresDataSource = new DataSource(dsoPostgres)
