// TODO: make service for external API data
import { PostgresDataSource } from '../data-source'
import { ProductEntity } from '../entities/product.entity'

const remoteService = {
  create: async (product: ProductEntity): Promise<ProductEntity> => {
    try {
      return await PostgresDataSource.getRepository(ProductEntity).save(product)
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findAll: async (): Promise<ProductEntity[]> => {
    try {
      const result = await fetch('https://retoolapi.dev/GIfGRZ/product')
      const products: ProductEntity[] = await result.json() as ProductEntity[]
      return products
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findById: async (id: number): Promise<ProductEntity> => {
    try {
      const result = await fetch(`https://retoolapi.dev/GIfGRZ/product/${id}`)
      const product: ProductEntity = await result.json() as ProductEntity
      if (product != null) {
        return product
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      throw new Error(String(error))
    }
  }
}

export default remoteService
