import { UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../data-source'
import { ProductEntity } from '../entities/product.entity'
import { PaginatorQueryData, ResultSetPage } from '../types'
import categoryService from './category.service'
import remoteService from './remote.service'
import { getLimitQuery, getOffsetQuery, calculateNextOffset, calculatePreviousOffset } from '../helpers'

const productService = {
  create: async (product: ProductEntity): Promise<ProductEntity> => {
    try {
      product = await PostgresDataSource
        .getRepository(ProductEntity)
        .save(product)

      return product
    } catch (error) {
      throw new Error(String(error))
    }
  },
  count: async (): Promise<number> => {
    try {
      const count = await PostgresDataSource
        .getRepository(ProductEntity)
        .createQueryBuilder()
        .where('isactive = :active', { active: true })
        .getCount()

      return count
    } catch (error) {
      throw new Error(String(error))
    }
  },
  find: async (link: PaginatorQueryData): Promise<ResultSetPage<ProductEntity>> => {
    try {
      const products = await PostgresDataSource
        .getRepository(ProductEntity)
        .createQueryBuilder()
        .orderBy('id')
        .where('isactive = :active', { active: true })
        .limit(getLimitQuery(link))
        .offset(getOffsetQuery(link))
        .getMany()
      const count = await PostgresDataSource
        .getRepository(ProductEntity)
        .createQueryBuilder()
        .where('isactive = :active', { active: true })
        .getCount()

      const page: ResultSetPage<ProductEntity> = {
        count,
        limit: getLimitQuery(link),
        nextOffset: calculateNextOffset(link, count),
        previousOffset: calculatePreviousOffset(link),
        results: products
      }

      return page
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findById: async (id: string): Promise<ProductEntity> => {
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
  findByCategory: async (id: string, link: PaginatorQueryData): Promise<ResultSetPage<ProductEntity>> => {
    try {
      const products = await PostgresDataSource
        .getRepository(ProductEntity)
        .createQueryBuilder()
        .orderBy('id')
        .where('isactive = :active', { active: true })
        .andWhere('categoryid = :id', { id })
        .limit(link !== undefined ? link.limit : 20)
        .offset(link !== undefined ? link.offset : 0)
        .getMany()
      const count = await PostgresDataSource
        .getRepository(ProductEntity)
        .createQueryBuilder()
        .where('isactive = :active', { active: true })
        .andWhere('categoryid = :id', { id })
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
  updateById: async (id: string, changes: Object): Promise<UpdateResult> => {
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
  },
  findGlobaly: async (link: PaginatorQueryData): Promise<ResultSetPage<ProductEntity>> => {
    try {
      const localCount = await productService.count()
      const remoteCount = await remoteService.count()
      const globalCount = localCount + remoteCount

      if (link.offset >= localCount) {
        // We use entirely data from remote
        const remoteStart = link.offset - localCount
        const remoteEnd = link.limit + remoteStart
        const remoteProducts: ProductEntity[] = await remoteService.findSlice(remoteStart, remoteEnd)

        const page: ResultSetPage<ProductEntity> = {
          count: globalCount,
          limit: link !== undefined ? link.limit : 20,
          nextOffset: link !== undefined && (link.offset + link.limit) < globalCount ? link.offset + link.limit : link.offset,
          previousOffset: link !== undefined && link.offset >= link.limit ? link.offset - link.limit : 0,
          results: remoteProducts
        }

        return page
      } else if (link.offset < localCount && link.offset + link.limit >= localCount) {
        // We use data from local and remote
        const page = await productService.find(link)
        const difPage: number = link.limit - page.results.length
        const remoteProducts: ProductEntity[] = await remoteService.findSlice(0, difPage)

        page.results.push(...remoteProducts)

        // FIX: nextOffset

        return page
      } else {
        // only local data
        return await productService.find(link)
      }
    } catch (error) {
      throw new Error(String(error))
    }
  },
  setCategory: async (productId: string, categoryId: string): Promise<UpdateResult> => {
    try {
      const category = await categoryService.findById(categoryId)

      const updatedProduct = await PostgresDataSource
        .createQueryBuilder()
        .update(ProductEntity)
        .set({ category })
        .where('id = :id', { id: productId })
        .execute()

      return updatedProduct
    } catch (error) {
      throw new Error(String(error))
    }
  }
}

export default productService
