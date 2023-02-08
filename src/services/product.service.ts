import { UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../data-source'
import { ProductEntity } from '../entities/product.entity'

const productService = {
  create: async (product: ProductEntity): Promise<ProductEntity> => {
    try {
      return await PostgresDataSource.getRepository(ProductEntity).save(product)
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findAll: async (): Promise<ProductEntity[]> => {
    try {
      const products = await PostgresDataSource.getRepository(ProductEntity).find()
      return products
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
