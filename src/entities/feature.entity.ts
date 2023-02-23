/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, OneToMany } from 'typeorm'
import { AbstractEntity } from './abstract.entity'
import { CategoryFeatureEntity } from './categoryFeature.entity'
import { ProductFeatureEntity } from './productFeature.entity'

@Entity('feature')
export class FeatureEntity extends AbstractEntity {
  @Column({
    nullable: true
  })
  description!: string

  @Column({
    nullable: false,
    unique: true
  })
  name!: string

  @OneToMany(
    () => CategoryFeatureEntity,
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (categoryFeature) => categoryFeature.category
  )
  categories!: Promise<CategoryFeatureEntity[]>

  @OneToMany(
    () => ProductFeatureEntity,
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (productFeature) => productFeature.product
  )
  products!: Promise<CategoryFeatureEntity[]>
}
