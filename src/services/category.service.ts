import { In, UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../data-source'
import { CategoryEntity } from '../entities/category.entity'
import { ProductEntity } from '../entities/product.entity'

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
  findAll: async (): Promise<CategoryEntity[]> => {
    try {
      const categories = await PostgresDataSource
        .getRepository(CategoryEntity)
        .find()
      return categories
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findById: async (id: number): Promise<{}> => {
    try {
      const category = await PostgresDataSource
        .getRepository(CategoryEntity)
        .findOneBy({ id })

      if (category == null) throw new Error('Category not found')

      return category
    } catch (error) {
      throw new Error(String(error))
    }
  },
  updateById: async (id: number, changes: Object): Promise<UpdateResult> => {
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
  },
  addProducts: async (id: number, productIds: number[]): Promise<CategoryEntity> => {
    try {
      const products: ProductEntity[] = await PostgresDataSource
        .getRepository(ProductEntity)
        .find({
          where: {
            id: In(productIds)
          }
        })

      const category: CategoryEntity | null = await PostgresDataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder('c')
        .where('c.id = :id', { id })
        .getOne()

      if (category == null) {
        throw new Error('Category not found')
      }
      const catProducts = await category.products
      if (catProducts == null) {
        category.products = Promise.resolve(products)
      } else {
        (await category.products).push(...products)
      }

      return await PostgresDataSource.manager.save(category)
    } catch (error) {
      throw new Error(String(error))
    }
  }
}

export default categoryService
