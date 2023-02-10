import { UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../../src/data-source'
import { ProductEntity } from '../../src/entities/product.entity'
// import { deleteAllRows } from '../../src/helpers'
import productService from '../../src/services/product.service'
// import ResultSetPage from '../../src/types.d'

describe('ProductService', () => {
  beforeAll(async () => {
    if (!PostgresDataSource.isInitialized) {
      await PostgresDataSource.initialize()
      await PostgresDataSource.synchronize(true)
      // await deleteAllRows(PostgresDataSource)
    }

    const product = new ProductEntity()
    product.brand = 'jmtp'
    product.name = 'Product 001'
    product.description = 'Generic description'
    await productService.create(product)
  })

  test('Insert new record', async () => {
    const product = new ProductEntity()
    product.brand = 'jmtp'
    product.name = 'Product 002'
    product.description = 'Generic description product 002'
    const newProduct = await productService.create(product)
    expect(newProduct.id).toBeGreaterThan(0)
    expect(newProduct.name).toBe(product.name)
    return undefined
  })

  test('Get product by id=1', async () => {
    const id = 1
    const product = await productService.findById(id)
    expect(product).toBeInstanceOf(ProductEntity)
    expect(product.id).toBe(id)
    return undefined
  })

  test('Update product by id=1', async () => {
    const id = 1
    const changes = {
      name: 'Product name changed'
    }
    const result = await productService.updateById(id, changes)
    expect(result).toBeInstanceOf(UpdateResult)

    const product = await productService.findById(id)
    expect(product.name).toBe(changes.name)
    return undefined
  })

  afterAll(async () => {
    await PostgresDataSource.destroy()
  })
})
