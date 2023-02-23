/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { UpdateResult } from 'typeorm'
import { PostgresDataSource } from '../data-source'
import { FeatureEntity } from '../entities/feature.entity'
import { LinkPage, ResultSetPage } from '../types'

class FeatureService {
  static async create (feature: FeatureEntity): Promise<FeatureEntity> {
    try {
      const newFeature = await PostgresDataSource
        .getRepository(FeatureEntity)
        .save(feature)

      return newFeature
    } catch (error) {
      throw new Error(String(error))
    }
  }

  static async find (link: LinkPage): Promise<ResultSetPage<FeatureEntity>> {
    try {
      const features = await PostgresDataSource
        .getRepository(FeatureEntity)
        .createQueryBuilder()
        .orderBy('name')
        .limit(link !== undefined ? link.limit : 20)
        .offset(link !== undefined ? link.offset : 0)
        .getMany()
      const count = await PostgresDataSource
        .getRepository(FeatureEntity)
        .createQueryBuilder()
        .getCount()
      const page: ResultSetPage<FeatureEntity> = {
        count,
        limit: link !== undefined ? link.limit : 20,
        nextOffset: link !== undefined && (link.offset + link.limit) < count ? link.offset + link.limit : link.offset,
        previousOffset: link !== undefined && link.offset >= link.limit ? link.offset - link.limit : 0,
        results: features
      }

      return page
    } catch (error) {
      throw new Error(String(error))
    }
  }

  static async findById (id: string): Promise<FeatureEntity> {
    try {
      const feature = await PostgresDataSource
        .getRepository(FeatureEntity)
        .findOneBy({ id })

      if (feature == null) throw new Error('Feature not found')

      return feature
    } catch (error) {
      throw new Error(String(error))
    }
  }

  static async updateById (id: string, changes: Object): Promise<UpdateResult> {
    try {
      const result = await PostgresDataSource
        .createQueryBuilder()
        .update(FeatureEntity)
        .set(changes)
        .where('id = :id', { id })
        .execute()
      return result
    } catch (error) {
      throw new Error(String(error))
    }
  }
}

export default FeatureService
