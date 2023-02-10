import { Request, Response, NextFunction } from 'express'
import { CategoryEntity } from '../entities/category.entity'
import categoryService from '../services/category.service'
import { LinkPage } from '../types'

const categoryController = {
  index: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const link: LinkPage = {
        offset: req.query.offset !== undefined ? +req.query.offset : 0,
        limit: req.query.limit !== undefined ? +req.query.limit : 20
      } as unknown as LinkPage

      const categories = await categoryService.find(link)
      res
        .status(200)
        .json(categories)
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: "We can't show the list of categories"
      })
    }
  },
  findById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const category = await categoryService.findById(+id)
      res
        .status(200)
        .json(category)
    } catch (error) {
      next({
        status: 404,
        errorContent: error,
        message: 'We can\'t find the category'
      })
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category: CategoryEntity = req.body as CategoryEntity
      const newCategory = await categoryService.create(category)
      res
        .status(200)
        .json(newCategory)
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'Could not create the category'
      })
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const changes: Object = req.body
      const result = await categoryService.updateById(+id, changes)

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
  addProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { productIds } = req.body
      const category: CategoryEntity = await categoryService.addProducts(+id, productIds)

      await category.products

      res
        .status(200)
        .json(category)
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'We can\'t add products to the category'
      })
    }
  }
}

export default categoryController
