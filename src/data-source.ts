import { DataSource } from 'typeorm'
import { getCheckedEnvParams } from './helpers'
import { ProductEntity } from './entities/product.entity'

import * as dotenv from 'dotenv'
if (getCheckedEnvParams('NODE_ENV') === 'DEV') {
  dotenv.config()
}

const host: string = getCheckedEnvParams('DB_HOTNAME')
const port: number = +getCheckedEnvParams('DB_PORT')
const username: string = getCheckedEnvParams('DB_USERNAME')
const password: string = getCheckedEnvParams('DB_PASSWORD')
const database: string = getCheckedEnvParams('DB_NAME')

export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  synchronize: true,
  entities: [
    ProductEntity
  ]
})
