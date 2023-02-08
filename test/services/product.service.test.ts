import { UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../../src/data-source'
import { ProductEntity } from '../../src/entities/product.entity'
import productService from '../../src/services/product.service'

beforeAll(async () => {
  if (!PostgresDataSource.isInitialized) {
    await PostgresDataSource.initialize()
  }
  const product = new ProductEntity()
  product.brand = 'jmtp'
  product.name = 'Product 001'
  product.description = 'Generic description'
  await productService.create(product)
})

describe('ProductService', () => {
  test('findAll: Promise<ProductEntity[]>', async () => {
    const products = await productService.findAll()
    expect(products).toBeInstanceOf(Array<ProductEntity>)
  })

  test('Insert new record', async () => {
    const product = new ProductEntity()
    product.brand = 'jmtp'
    product.name = 'Product 002'
    product.description = 'Generic description product 002'
    const newProduct = await productService.create(product)
    expect(newProduct.id).toBeGreaterThan(0)
    expect(newProduct.name).toBe(product.name)
  })

  test('Get product by id [1]', async () => {
    const id = 1
    const product = await productService.findById(id)
    expect(product).toBeInstanceOf(ProductEntity)
    expect(product.id).toBe(id)
  })

  test('Update product of id=1', async () => {
    const id = 1
    const changes = {
      name: 'Product name changed'
    }
    const result = await productService.updateById(id, changes)
    expect(result).toBeInstanceOf(UpdateResult)

    const product = await productService.findById(id)
    expect(product.name).toBe(changes.name)
  })
})
