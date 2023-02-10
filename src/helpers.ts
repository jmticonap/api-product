import { env } from 'process'
import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { DataSource } from 'typeorm'
import { ProductEntity } from './entities/product.entity'
import { CategoryEntity } from './entities/category.entity'

export const getCheckedEnvParams = (paramName: string): string => {
  if (paramName.length === 0) {
    throw new Error('Parameter must be different from empty string')
  }
  const paramVal: string = env[paramName] ?? ''
  if (paramVal !== undefined && paramVal !== null && paramVal.length > 0) {
    return paramVal
  } else {
    throw new Error(`${paramName} must not be undefined or null or empty string`)
  }
}

export const validateResult = (req: Request, res: Response, next: NextFunction): void => {
  try {
    validationResult(req).throw()
    return next()
  } catch (err: any) {
    res.status(403)
    res.send({ errors: err.array() })
  }
}

export const bodyCleaner = (req: Request, updatableFields: string[]): Request => {
  const keys = Object.keys(req.body)
  const notPermitFields: string[] = []
  /*
  Fill the list with the fields that are not permit to go
  in the body for update
  */
  for (const key of keys) {
    if (!updatableFields.includes(key)) {
      notPermitFields.push(key)
    }
  }
  for (const key of notPermitFields) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete req.body[key]
  }

  return req
}

export const deleteAllRows = async (ds: DataSource): Promise<void> => {
  await ds.createQueryBuilder().delete().from(ProductEntity).execute()
  await ds.createQueryBuilder().delete().from(CategoryEntity).execute()
}
