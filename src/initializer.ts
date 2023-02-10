import { CategoryEntity } from './entities/category.entity'
import { ProductEntity } from './entities/product.entity'
import categoryService from './services/category.service'
import productService from './services/product.service'

export const initializeDB = async (): Promise<void> => {
  for (let i = 1; i <= 10; i++) {
    const category = new CategoryEntity()
    category.name = `Category #${i}`
    category.description = 'Description empty'

    await categoryService.create(category)
  }

  const category1 = await categoryService.findById(1)
  for (let j = 1; j <= 40; j++) {
    const product = new ProductEntity()
    product.name = `Product #${j}`
    product.description = `Description empty #${j}`
    product.brand = 'jmtp.dev'
    product.price = Math.round((20 + Math.random() * 80) * 100) / 100
    product.stock = Math.round(100 + Math.random() * 100)
    product.category = Promise.resolve(category1)

    await productService.create(product)
  }

  const category2 = await categoryService.findById(2)
  for (let j = 41; j <= 80; j++) {
    const product = new ProductEntity()
    product.name = `Product #${j}`
    product.description = `Description empty #${j}`
    product.brand = 'jmtp.dev'
    product.price = Math.round((20 + Math.random() * 80) * 100) / 100
    product.stock = Math.round(100 + Math.random() * 100)
    product.category = Promise.resolve(category2)

    await productService.create(product)
  }

  for (let k = 81; k <= 120; k++) {
    const product = new ProductEntity()
    product.name = `Product #${k}`
    product.description = `Description empty #${k}`
    product.brand = 'jmtp.dev'
    product.price = Math.round((20 + Math.random() * 80) * 100) / 100
    product.stock = Math.round(100 + Math.random() * 100)

    await productService.create(product)
  }
}
