// TODO: make service for external API data
import { env } from 'process'
import { ProductEntity } from '../entities/product.entity'

const { REMOTE_API } = env
const checkParam = (param: string | undefined): void => {
  if (param === undefined) throw new Error('The remote path must not be undefined')
}
const checkResult = <T>(result: T): T => {
  if (result != null) {
    return result
  } else {
    throw new Error('Product not found')
  }
}
const remoteService = {
  count: async (): Promise<number> => {
    try {
      checkParam(REMOTE_API)

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const response = await fetch(`${REMOTE_API}?isActive=true&_start=1&_limit=1`)
      const paramVal = response.headers.get('x-total-count')
      if (paramVal !== null) {
        return +paramVal
      } else {
        throw new Error('This value can be null')
      }
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findAll: async (): Promise<ProductEntity[]> => {
    try {
      checkParam(REMOTE_API)

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const result = await fetch(`${REMOTE_API}`)
      const products: ProductEntity[] = await result.json() as ProductEntity[]

      return checkResult(products)
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findById: async (id: number): Promise<ProductEntity> => {
    try {
      checkParam(REMOTE_API)

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const result = await fetch(`${REMOTE_API}/${id}`)
      const product: ProductEntity = await result.json() as ProductEntity

      return checkResult(product)
    } catch (error) {
      throw new Error(String(error))
    }
  },
  findSlice: async (start: number, end: number): Promise<ProductEntity[]> => {
    try {
      // https://retoolapi.dev/WPKpCW/product?isActive=true&_start=20&_end=30
      checkParam(REMOTE_API)

      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const result = await fetch(`${REMOTE_API}?isActive=true&_start=${start}&_end=${end}`)
      const remoteProducts: ProductEntity[] = await result.json() as ProductEntity[]

      return checkResult(remoteProducts)
    } catch (error) {
      throw new Error(String(error))
    }
  }
}

export default remoteService
