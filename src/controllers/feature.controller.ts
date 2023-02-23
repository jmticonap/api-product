import { Request, Response, NextFunction } from 'express'
import { FeatureEntity } from '../entities/feature.entity'
import FeatureService from '../services/feature.service'
import { LinkPage } from '../types'

const featureController = {
  index: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const link: LinkPage = {
        offset: req.query.offset !== undefined ? +req.query.offset : 0,
        limit: req.query.limit !== undefined ? +req.query.limit : 20
      } as unknown as LinkPage

      const features = await FeatureService.find(link)
      res
        .status(200)
        .json(features)
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'We can\'t show the list of features'
      })
    }
  },
  findById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const feature = await FeatureService.findById(id)
      res
        .status(200)
        .json(feature)
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'We can\'t find the feature'
      })
    }
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const feature: FeatureEntity = req.body as FeatureEntity
      const newFeature = await FeatureService.create(feature)
      res
        .status(200)
        .json(newFeature)
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'Could not create the feature'
      })
    }
  },
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params
      const changes: Object = req.body
      const result = await FeatureService.updateById(id, changes)

      res
        .status(200)
        .json({
          affected: result.affected
        })
    } catch (error) {
      next({
        status: 400,
        errorContent: error,
        message: 'We can\'t update the feature'
      })
    }
  }
}

export default featureController
