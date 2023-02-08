/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { NextFunction, Request, Response } from 'express'
import { bodyCleaner } from '../helpers'

const updatableFields = [
  'name',
  'description',
  'isActive',
  'brand',
  'stock',
  'price'
]

const productUpdateCleaner = (req: Request, _res: Response, next: NextFunction): void => {
  bodyCleaner(req, updatableFields)
  return next()
}

export default productUpdateCleaner
