import { UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../../src/data-source'
import { CategoryEntity } from '../../src/entities/category.entity'
import { ProductEntity } from '../../src/entities/product.entity'
import categoryService from '../../src/services/category.service'
import productService from '../../src/services/product.service'

beforeAll(async () => {
  if (!PostgresDataSource.isInitialized) {
    await PostgresDataSource.initialize()
  }

  const category = new CategoryEntity()
  category.name = 'generics'
  category.description = 'Category for uncategorizable products'
  await categoryService.create(category)

  const product = new ProductEntity()
  product.brand = 'Lenovo'
  product.name = 'Ideapad 5'
  product.description = 'Lenovo laptop i7'
  await productService.create(product)
})

describe('CategoryService', () => {
  test('findAll: Promise<categoryEntity[]>', async () => {
    const categories = await categoryService.findAll()
    expect(categories).toBeInstanceOf(Array<CategoryEntity>)
  })

  test('Insert new record', async () => {
    const category = new CategoryEntity()
    category.name = 'generics'
    category.description = 'Category for uncategorizable products'

    const newCategory = await categoryService.create(category)
    expect(newCategory.id).toBeGreaterThan(0)
    expect(newCategory.name).toBe(category.name)
  })

  test('Get category by id=1', async () => {
    const id = 1
    const category = await categoryService.findById(id)
    expect(category).toBeInstanceOf(CategoryEntity)
    expect(category.id).toBe(id)
  })

  test('Update category by id=1', async () => {
    const id = 1
    const changes = {
      name: 'generics changed'
    }
    const result = await categoryService.updateById(id, changes)
    expect(result).toBeInstanceOf(UpdateResult)

    const category = await categoryService.findById(id)
    expect(category.name).toBe(changes.name)
  })

  test('Add products to category', async () => {
    const category = await categoryService.addProducts(1, [1])
    const catProducts = await category?.products
    expect(catProducts?.length).toBe(1)
  })
})
