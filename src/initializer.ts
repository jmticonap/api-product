import { CategoryEntity } from './entities/category.entity'
import { ProductEntity } from './entities/product.entity'
import categoryService from './services/category.service'
import productService from './services/product.service'

export const initializeDB = async (): Promise<void> => {
  const cat1 = new CategoryEntity()
  cat1.name = 'Computers'
  cat1.description = 'catComputers empty'

  const cat2 = new CategoryEntity()
  cat2.name = 'Garden'
  cat2.description = 'catComputers empty'

  const catComputers = await categoryService.create(cat1)
  const catGarden = await categoryService.create(cat2)

  for (let i = 1; i <= 10; i++) {
    const category = new CategoryEntity()
    category.name = `Category #${i}`
    category.description = 'Description empty'

    await categoryService.create(category)
  }

  for (let j = 1; j <= 40; j++) {
    const product = new ProductEntity()
    product.name = `Product #${j}`
    product.description = `Description empty #${j}`
    product.brand = 'jmtp.dev'
    product.price = Math.round((20 + Math.random() * 80) * 100) / 100
    product.stock = Math.round(100 + Math.random() * 100)
    product.isActive = Math.round(Math.random() * 100) % 8 !== 0
    product.category = Promise.resolve(catComputers)

    await productService.create(product)
  }

  for (let j = 41; j <= 80; j++) {
    const product = new ProductEntity()
    product.name = `Product #${j}`
    product.description = `Description empty #${j}`
    product.brand = 'jmtp.dev'
    product.price = Math.round((20 + Math.random() * 80) * 100) / 100
    product.stock = Math.round(100 + Math.random() * 100)
    product.isActive = Math.round(Math.random() * 100) % 8 !== 0
    product.category = Promise.resolve(catGarden)

    await productService.create(product)
  }

  for (let k = 81; k <= 120; k++) {
    const product = new ProductEntity()
    product.name = `Product #${k}`
    product.description = `Description empty #${k}`
    product.brand = 'jmtp.dev'
    product.price = Math.round((20 + Math.random() * 80) * 100) / 100
    product.stock = Math.round(100 + Math.random() * 100)
    product.isActive = Math.round(Math.random() * 100) % 8 !== 0

    await productService.create(product)
  }
}
