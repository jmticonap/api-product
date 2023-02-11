import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import { bodyCleaner, validateResult } from '../helpers'

const updatableFields = [
  'name',
  'description',
  'isactive',
  'brand',
  'stock',
  'price'
]

const productUpdateValidator = [
  check('name')
    .optional()
    .not()
    .isEmpty(),
  check('description')
    .optional()
    .not()
    .isEmpty(),
  check('isactive')
    .optional()
    .isBoolean(),
  check('brand')
    .optional()
    .notEmpty(),
  check('stock')
    .optional()
    .isNumeric()
    .custom(value => value > 0),
  check('price')
    .optional()
    .isNumeric()
    .custom(value => value > 0),
  (req: Request, res: Response, next: NextFunction): void => {
    bodyCleaner(req, updatableFields)
    validateResult(req, res, next)
  }
]

export default productUpdateValidator
