import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import { bodyCleaner, validateResult } from '../helpers'

const updatableFields = [
  'name',
  'description'
]

const categoryUpdateValidator = [
  check('name')
    .optional()
    .not()
    .isEmpty(),
  check('description')
    .optional()
    .not()
    .isEmpty(),
  (req: Request, res: Response, next: NextFunction): void => {
    bodyCleaner(req, updatableFields)
    validateResult(req, res, next)
  }
]

export default categoryUpdateValidator
