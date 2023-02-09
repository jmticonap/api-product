import { Request, Response, NextFunction } from 'express'
import { check } from 'express-validator'
import { validateResult } from '../helpers'

const categoryCreateValidator = [
  check('name')
    .exists()
    .not()
    .isEmpty(),
  check('description')
    .exists()
    .not()
    .isEmpty(),
  (req: Request, res: Response, next: NextFunction): void => {
    validateResult(req, res, next)
  }
]

export default categoryCreateValidator
