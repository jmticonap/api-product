import { UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../../src/data-source'
import { CategoryEntity } from '../../src/entities/category.entity'
import { ProductEntity } from '../../src/entities/product.entity'
import categoryService from '../../src/services/category.service'
import productService from '../../src/services/product.service'

describe('CategoryService', () => {
  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!PostgresDataSource.isInitialized) {
      await PostgresDataSource.initialize()
      await PostgresDataSource.synchronize(true)
    }

    const category = new CategoryEntity()
    category.name = 'generics'
    category.description = 'Category for uncategorizable products'
    await categoryService.create(category)

    const product1 = new ProductEntity()
    product1.brand = 'Lenovo'
    product1.name = 'Ideapad 5'
    product1.description = 'Lenovo laptop i7'
    await productService.create(product1)

    const product2 = new ProductEntity()
    product2.brand = 'Xiaomi'
    product2.name = 'Redmi Note 8'
    product2.description = 'Smarthphone Xiaomi'
    await productService.create(product2)
  })

  const categoryTest = new CategoryEntity()
  categoryTest.name = 'generics_test'
  categoryTest.description = 'Category for uncategorizable products'

  test('Insert new record', async () => {
    const newCategory = await categoryService.create(categoryTest)
    expect(newCategory.id.length).toBeGreaterThan(0)
    expect(newCategory.name).toBe(categoryTest.name)
    return undefined
  })

  test('Get category by ID', async () => {
    const id = categoryTest.id
    const category = await categoryService.findById(id)
    expect(id).not.toBeUndefined()
    expect(category.name).toBe(categoryTest.name)
    expect(category).toBeInstanceOf(CategoryEntity)
    expect(category.id).toBe(id)
    return undefined
  })

  test('Update category by ID', async () => {
    const id = categoryTest.id
    const changes = {
      name: 'generics changed'
    }
    const result = await categoryService.updateById(id, changes)
    expect(result).toBeInstanceOf(UpdateResult)

    const category = await categoryService.findById(id)
    expect(category.name).toBe(changes.name)
    return undefined
  })

  test('Add products to category', async () => {
    const id = categoryTest.id
    const productPage = await productService.find({ offset: 0, limit: 2 })
    const [prod1, prod2] = productPage.results

    const result = await categoryService.addProducts(id, [prod1.id, prod2.id])

    expect(result.affected).toBe(2)
    return undefined
  })

  afterAll(async () => {
    await PostgresDataSource.destroy()
  })
})
