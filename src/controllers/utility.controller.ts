import { Request, Response, NextFunction } from 'express'
import { PostgresDataSource } from '../data-source'
import { initializeDB } from '../initializer'

const utilityController = {
  ceateSchemaDB: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await PostgresDataSource.synchronize(true)
      res
        .status(200)
        .json({
          message: 'DB schema was created successfully'
        })
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: "We can't initialize DB"
      })
    }
  },
  initializeDB: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await initializeDB()
      res
        .status(200)
        .json({
          message: 'DB initialize with data for try out purpose'
        })
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: "We can't initialize DB"
      })
    }
  }
}

export default utilityController
