import { Request, Response } from 'express'
import { Error } from '../types.d'

const errorHandler = (error: Error, _req: Request, res: Response, _next: any): undefined => {
  res.status(error.status).json({
    message: error.message,
    error: error.errorContent.message
  })

  return undefined
}

export default errorHandler
