import { Request, Response, NextFunction } from 'express'
import productService from '../services/product.service'
import { PaginatorQueryData } from '../types'

const productController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const link: PaginatorQueryData = {
        offset: req.query.offset !== undefined ? +req.query.offset : 0,
        limit: req.query.limit !== undefined ? +req.query.limit : 20
      } as unknown as PaginatorQueryData

      // The process search in local DB and remote service
      const products = await productService.findGlobaly(link)
      res
        .status(200)
        .json(products)
    } catch (error) {
      next({
        status: 404,
        errorContent: error,
        message: "We can't show the list of products"
      })
    }
  },
  findById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const product = await productService.findById(id)
      res
        .status(200)
        .json(product)
    } catch (error) {
      next({
        status: 404,
        errorContent: error,
        message: 'We can\'t find the product'
      })
    }
  },
  findByCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const link: PaginatorQueryData = {
        offset: req.query.offset !== undefined ? +req.query.offset : 0,
        limit: req.query.limit !== undefined ? +req.query.limit : 20
      } as unknown as PaginatorQueryData

      const page = await productService.findByCategory(id, link)

      res
        .status(200)
        .json(page)
    } catch (error) {
      next({
        status: 404,
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
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const changes: Object = req.body
      const result = await productService.updateById(id, changes)

      res
        .status(200)
        .json({
          affected: result.affected
        })
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'We can\'t update the product'
      })
    }
  },
  setCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { categoryId } = req.body
      const result = await productService.setCategory(id, categoryId)

      res
        .status(200)
        .json(result)
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'We can\'t set the category'
      })
    }
  }
}

export default productController
