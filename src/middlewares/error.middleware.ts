import { Error } from '../types.d'

const errorHandler = (error: Error, _req:any , res:any, _next:any) => {
  res.status(error.status).json({
    message: error.message,
    error: error.errorContent.message,
  })
}

export default errorHandler