import { Request, Response, NextFunction } from 'express'

const productController = {
  index: (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json('Show products list')
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: "We can't show the list od products"
      })
    }
  },
  findById: (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json('Show product find by ID')
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'We can\'t find the product'
      })
    }
  },
  create: (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json('Create new product')
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
