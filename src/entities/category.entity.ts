/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, OneToMany } from 'typeorm'
import { AbstractEntity } from './abstract.entity'
import { CategoryFeatureEntity } from './categoryFeature.entity'
import { ProductEntity } from './product.entity'

@Entity('category')
export class CategoryEntity extends AbstractEntity {
  @Column({
    nullable: false,
    unique: true
  })
  name!: string

  @Column({
    nullable: false
  })
  description!: string

  @OneToMany(
    () => ProductEntity,
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (product) => product.category
  )
  products!: Promise<ProductEntity[]>

  @OneToMany(
    () => CategoryFeatureEntity,
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (categoryFeature) => categoryFeature.category
  )
  features!: Promise<CategoryFeatureEntity[]>
}
