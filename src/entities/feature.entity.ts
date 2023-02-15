/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CategoryFeatureEntity } from './categoryFeature.entity'
import { ProductFeatureEntity } from './productFeature.entity'

@Entity('feature')
export class FeatureEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({
    nullable: true,
    name: 'full_name'
  })
  fullName!: string

  @Column({
    nullable: false,
    unique: true,
    name: 'short_name'
  })
  shortName!: string

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
