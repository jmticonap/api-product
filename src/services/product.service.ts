import { UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../data-source'
import { ProductEntity } from '../entities/product.entity'
import { LinkPage, ResultSetPage } from '../types'

const productService = {
  create: async (product: ProductEntity): Promise<ProductEntity> => {
    try {
      return await PostgresDataSource.getRepository(ProductEntity).save(product)
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findAll: async (link: LinkPage): Promise<ResultSetPage<ProductEntity>> => {
    try {
      const products = await PostgresDataSource
        .getRepository(ProductEntity)
        .createQueryBuilder()
        .orderBy('id')
        .limit(link !== undefined ? link.limit : 20)
        .offset(link !== undefined ? link.offset : 0)
        .getMany()
      const count = await PostgresDataSource
        .getRepository(ProductEntity)
        .createQueryBuilder()
        .getCount()

      const page: ResultSetPage<ProductEntity> = {
        count,
        limit: link !== undefined ? link.limit : 20,
        nextOffset: link !== undefined && (link.offset + link.limit) < count ? link.offset + link.limit : link.offset,
        previousOffset: link !== undefined && link.offset >= link.limit ? link.offset - link.limit : 0,
        results: products
      }

      return page
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findById: async (id: number): Promise<ProductEntity> => {
    try {
      const product: ProductEntity | null = await PostgresDataSource
        .getRepository(ProductEntity)
        .findOneBy({ id })
      if (product != null) {
        return product
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      throw new Error(String(error))
    }
  },
  updateById: async (id: number, changes: Object): Promise<UpdateResult> => {
    try {
      const result = await PostgresDataSource
        .createQueryBuilder()
        .update(ProductEntity)
        .set(changes)
        .where('id = :id', { id })
        .execute()
      return result
    } catch (error) {
      throw new Error(String(error))
    }
  }
}

export default productService
