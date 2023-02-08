import { UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../../src/data-source'
import { CategoryEntity } from '../../src/entities/category.entity'
import categoryService from '../../src/services/category.service'

beforeAll(async () => {
  if (!PostgresDataSource.isInitialized) {
    await PostgresDataSource.initialize()
  }
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

  test('Get category by id [1]', async () => {
    const id = 1
    const category = await categoryService.findById(id)
    expect(category).toBeInstanceOf(CategoryEntity)
    expect(category.id).toBe(id)
  })

  test('Update category of id=1', async () => {
    const id = 1
    const changes = {
      name: 'generics changed'
    }
    const result = await categoryService.updateById(id, changes)
    expect(result).toBeInstanceOf(UpdateResult)

    const category = await categoryService.findById(id)
    expect(category.name).toBe(changes.name)
  })
})
