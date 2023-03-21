import { env } from 'process'
import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import { PaginatorQueryData } from './types'

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

// Services Query utilities
export const getLimitQuery = (link: PaginatorQueryData): number => {
  if (link !== undefined) {
    return link.limit
  } else {
    return 20
  }
}

export const getOffsetQuery = (link: PaginatorQueryData): number => {
  if (link !== undefined) {
    return link.offset
  } else {
    return 0
  }
}

export const calculateNextOffset = (link: PaginatorQueryData, count: number): number => {
  if (link !== undefined &&
    link.offset + link.limit < count) {
    return link.offset + link.limit
  } else {
    return link.offset
  }
}

export const calculatePreviousOffset = (link: PaginatorQueryData): number => {
  if (link !== undefined &&
    link.offset >= link.limit) {
    return link.offset - link.limit
  } else {
    return 0
  }
}
