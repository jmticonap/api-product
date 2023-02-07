import { DataSource } from 'typeorm'
import { getCheckedEnvParams } from './helpers'
import { ProductEntity } from './entities/product.entity'

import * as dotenv from 'dotenv'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
if (getCheckedEnvParams('NODE_ENV') === 'DEV') {
  dotenv.config()
}

const host: string = getCheckedEnvParams('DB_HOSTNAME')
const port: number = +getCheckedEnvParams('DB_PORT')
const username: string = getCheckedEnvParams('DB_USERNAME')
const password: string = getCheckedEnvParams('DB_PASSWORD')
const database: string = getCheckedEnvParams('DB_NAME')

export const dsoPostgres: PostgresConnectionOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  poolSize: 10,
  entities: [
    ProductEntity
  ]
}

export const PostgresDataSource = new DataSource(dsoPostgres)
