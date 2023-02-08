import { Request, Response, NextFunction } from 'express'
import { CategoryEntity } from '../entities/category.entity'
import categoryService from '../services/category.service'

const categoryController = {
  index: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await categoryService.findAll()
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
        status: 400,
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
  }
}

export default categoryController
