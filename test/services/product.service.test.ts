import { UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../../src/data-source'
import { CategoryEntity } from '../../src/entities/category.entity'
import { ProductEntity } from '../../src/entities/product.entity'
import categoryService from '../../src/services/category.service'
import productService from '../../src/services/product.service'

describe('ProductService', () => {
  const category = new CategoryEntity()
  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!PostgresDataSource.isInitialized) {
      await PostgresDataSource.initialize()
      await PostgresDataSource.synchronize(true)
    }

    category.name = 'generics'
    category.description = 'Category for uncategorizable products'
    await categoryService.create(category)

    const product1 = new ProductEntity()
    product1.brand = 'Lenovo'
    product1.name = 'Ideapad 5'
    product1.description = 'Lenovo laptop i7'
    product1.category = Promise.resolve(category)
    await productService.create(product1)

    const product2 = new ProductEntity()
    product2.brand = 'Xiaomi'
    product2.name = 'Redmi Note 8'
    product2.description = 'Smarthphone Xiaomi'
    product2.category = Promise.resolve(category)
    await productService.create(product2)

    const product = new ProductEntity()
    product.brand = 'jmtp'
    product.name = 'Product 001'
    product.description = 'Generic description'
    await productService.create(product)
  })

  const product = new ProductEntity()
  product.brand = 'jmtp'
  product.name = 'Product 002'
  product.description = 'Generic description product 002'

  test('Find', async () => {
    const products = await productService.find({ offset: 0, limit: 20 })

    expect(products.results.length).toBeGreaterThan(0)

    return undefined
  })

  test('FindByCategory', async () => {
    const products = productService.findByCategory(category.id, { offset: 0, limit: 20 })

    expect((await products).results.length).toBe(2)
    return undefined
  })

  test('FindGlobaly --onlyLocal', async () => {
    const localProducts = await productService.find({ offset: 0, limit: 20 })
    const localRemoteProducts = await productService.findGlobaly({ offset: 0, limit: 20 })

    expect(localRemoteProducts.results.length).toBeGreaterThan(localProducts.results.length)

    return undefined
  })

  test('FindGlobaly --onlyRemote', async () => {
    const localProducts = await productService.find({ offset: 0, limit: 20 })
    const offset = localProducts.results.length
    const localRemoteProducts = await productService.findGlobaly({ offset, limit: 20 })

    // First page data only from remote
    expect(localRemoteProducts.results.length).toBe(20)

    return undefined
  })

  test('Insert new record', async () => {
    const newProduct = await productService.create(product)
    expect(newProduct.id.length).toBeGreaterThan(0)
    expect(newProduct.name).toBe(product.name)

    return undefined
  })

  test('Get product by ID', async () => {
    const id = product.id
    const prod = await productService.findById(id)
    expect(prod).toBeInstanceOf(ProductEntity)
    expect(prod.id).toBe(id)

    return undefined
  })

  test('Update product by id=1', async () => {
    const id = product.id
    const changes = {
      name: 'Product name changed'
    }
    const result = await productService.updateById(id, changes)
    expect(result).toBeInstanceOf(UpdateResult)

    const prod = await productService.findById(id)
    expect(prod.name).toBe(changes.name)
    return undefined
  })

  test('SetCategory', async () => {
    const result = await productService.setCategory(product.id, category.id)
    const findProduct = productService.findById(product.id)

    expect(result.affected).toBe(1)
    expect((await findProduct).id).toBe(category.id)

    return undefined
  })

  afterAll(async () => {
    await PostgresDataSource.destroy()
  })
})
