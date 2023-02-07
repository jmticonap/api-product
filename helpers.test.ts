import * as dotenv from 'dotenv'
import { getCheckedEnvParams } from './src/helpers'

beforeAll(() => {
  dotenv.config()
})

describe('Helpers', () => {
  test('Must not be undefined or null', () => {
    expect(() => { getCheckedEnvParams('') }).toThrow(/different from empty string/)
  })

  test('Return a string greather than zero', () => {
    expect(getCheckedEnvParams('PORT').length).toBeGreaterThan(0)
  })
})
