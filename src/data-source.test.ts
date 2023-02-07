import { env } from 'process'
env.NODE_ENV = 'DEV'
// eslint-disable-next-line import/first
import { dsoPostgres } from './data-source'

describe('DataSource', () => {
  test('Options from DEV environment', () => {
    expect(dsoPostgres.username).toBe('postgres')
    expect(dsoPostgres.password).toBe('password')
    expect(dsoPostgres.database).toBe('api_product_db')
  })
})
