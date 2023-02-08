import { Request, Response, NextFunction } from 'express'
import productService from '../services/product.service'

const productController = {
  index: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await productService.findAll()
      res
        .status(200)
        .json(products)
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: "We can't show the list of products"
      })
    }
  },
  findById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const product = await productService.findById(+id)
      res
        .status(200)
        .json(product)
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'We can\'t find the product'
      })
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = req.body
      const newProduct = await productService.create(product)
      res
        .status(200)
        .json(newProduct)
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'Could not create the product'
      })
    }
  },
  update: (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json('Update product by ID')
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'We can\'t update the product'
      })
    }
  }
}

export default productController
