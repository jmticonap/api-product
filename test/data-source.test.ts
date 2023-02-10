import { getCheckedEnvParams } from '../src/helpers'

// eslint-disable-next-line import/first
import { dsoPostgres, PostgresDataSource } from '../src/data-source'

describe('DataSource', () => {
  beforeAll(async () => {
    if (!PostgresDataSource.isInitialized) {
      await PostgresDataSource.initialize()
      await PostgresDataSource.synchronize(true)
      // await deleteAllRows(PostgresDataSource)
    }
  })

  test('Environment as TEST', () => {
    expect(getCheckedEnvParams('NODE_ENV')).toBe('TEST')
    return undefined
  })

  test('Options from DEV environment', () => {
    expect(dsoPostgres.username).toBe('postgres')
    expect(dsoPostgres.password).toBe('password')
    expect(dsoPostgres.database).toBe('test_api_product_db')
    return undefined
  })

  afterAll(async () => {
    await PostgresDataSource.destroy()
  })
})
