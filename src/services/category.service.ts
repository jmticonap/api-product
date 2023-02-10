import { In, UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../data-source'
import { CategoryEntity } from '../entities/category.entity'
import { ProductEntity } from '../entities/product.entity'
import { LinkPage, ResultSetPage } from '../types'

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
  find: async (link: LinkPage): Promise<ResultSetPage<CategoryEntity>> => {
    try {
      const categories = await PostgresDataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .orderBy('id')
        .limit(link !== undefined ? link.limit : 20)
        .offset(link !== undefined ? link.offset : 0)
        .getMany()
      const count = await PostgresDataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .getCount()

      const page: ResultSetPage<CategoryEntity> = {
        count,
        limit: link !== undefined ? link.limit : 20,
        nextOffset: link !== undefined && (link.offset + link.limit) < count ? link.offset + link.limit : link.offset,
        previousOffset: link !== undefined && link.offset >= link.limit ? link.offset - link.limit : 0,
        results: categories
      }

      return page
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findById: async (id: number): Promise<CategoryEntity> => {
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
  addProducts: async (id: number, productIds: number[]): Promise<{}> => {
    try {
      const products: ProductEntity[] = await PostgresDataSource
        .getRepository(ProductEntity)
        .find({
          where: {
            id: In(productIds)
          }
        })

      if (productIds.length !== products.length) throw new Error('One of the products don\'t exist')

      const category: CategoryEntity | null = await PostgresDataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder('c')
        .where('c.id = :id', { id })
        .getOne()

      if (category == null) throw new Error('Category not found')

      const catProducts = await category.products

      if (catProducts == null) {
        category.products = Promise.resolve(products)
      } else {
        // TODO: be sure those products there are already part of the category
        (await category.products).push(...products)
      }
      await PostgresDataSource.manager.save(category)
      return {
        affected: products.length
      }
    } catch (error) {
      throw new Error(String(error))
    }
  }
}

export default categoryService
