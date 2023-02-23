/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { AbstractEntity } from './abstract.entity'
import { CategoryEntity } from './category.entity'
import { FeatureEntity } from './feature.entity'

@Entity('category_feature')
export class CategoryFeatureEntity extends AbstractEntity {
  @Column({
    nullable: false,
    name: 'content_type'
  })
  contentType!: string

  @ManyToOne(
    () => CategoryEntity,
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (category) => category.features
  )
  @JoinColumn({ name: 'category_id' })
  category!: Promise<CategoryEntity>

  @ManyToOne(
    () => FeatureEntity,
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (feature) => feature.categories
  )
  @JoinColumn({ name: 'feature_id' })
  feature!: Promise<FeatureEntity>
}
