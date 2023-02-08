import * as dotenv from 'dotenv'
import { Request } from 'express'
import { bodyCleaner, getCheckedEnvParams } from '../src/helpers'

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

describe('BodyCleaner', () => {
  test('', () => {
    const updatableFields: string[] = [
      'name',
      'description',
      'brand',
      'stock',
      'price'
    ]
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const req = {
      body: {
        id: 2,
        name: 'product 002',
        descriptions: 'product 001 description modify',
        brand: 'jmtp',
        stock: 25,
        price: 90
      }
    } as Request
    expect(bodyCleaner(req, updatableFields).body.id).toBeUndefined()
  })
})
