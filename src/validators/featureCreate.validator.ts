import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import { validateResult } from '../helpers'

const featureCreateValidator = [
  check('name')
    .exists()
    .not()
    .isEmpty(),
  (req: Request, res: Response, next: NextFunction): void => {
    validateResult(req, res, next)
  }
]

export default featureCreateValidator
