import { PostgresDataSource } from '../data-source'
import { CategoryEntity } from '../entities/category.entity'

const categoryService = {
  create: async (category: CategoryEntity): Promise<CategoryEntity> => {
    try {
      const newCategory = await PostgresDataSource
        .getRepository(CategoryEntity)
        .save(category)
      return newCategory
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findAll: async () => {
    try {
      const categories = await PostgresDataSource
        .getRepository(CategoryEntity)
        .find()
      return categories
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findById: async (id: number): Promise<CategoryEntity> => {
    try {
      const category = await PostgresDataSource
        .getRepository(CategoryEntity)
        .findOneBy({ id })
      if (category != null) {
        return category
      } else {
        throw new Error('Category not found')
      }
    } catch (error) {
      throw new Error(String(error))
    }
  },
  updateById: async (id: number, changes: Object) => {
    try {
      const result = await PostgresDataSource
        .createQueryBuilder()
        .update(CategoryEntity)
        .set(changes)
        .where('id = :id', { id })
        .execute()
      return result
    } catch (error) {
      throw new Error(String(error))
    }
  }
}

export default categoryService
