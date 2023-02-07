import { DataSource } from 'typeorm'
import { env } from 'process'

const getCheckedDbParams = (paramName: string): string => {
  const paramVal: string = env[paramName] ?? ''
  if (paramVal !== undefined && paramVal !== null) {
    return paramVal
  } else {
    throw new Error(`${paramName} must not be undefined or null`)
  }
}

const host: string = getCheckedDbParams('DB_HOTNAME')
const port: number = +getCheckedDbParams('DB_PORT')
const username: string = getCheckedDbParams('DB_USERNAME')
const password: string = getCheckedDbParams('DB_PASSWORD')
const database: string = getCheckedDbParams('DB_NAME')

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [
    // ....
  ]
})

export default PostgresDataSource
