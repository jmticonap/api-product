import { ProductEntity } from '../../src/entities/product.entity'
import remoteService from '../../src/services/remote.service'

describe('RemoteService', () => {
  test('Fetch dataset from remote location', async () => {
    const products: ProductEntity[] = await remoteService.findAll()
    expect(products.length).toBe(100)
    // expect(products).toBeInstanceOf(Array<ProductEntity>)
  })

  test('Get remote product by id', async () => {
    const id = 1
    const product: ProductEntity = await remoteService.findById(id)
    expect(product.id).toBe(id)
    // expect(product).toBeInstanceOf(ProductEntity)
  })
})
