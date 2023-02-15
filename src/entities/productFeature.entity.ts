/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { FeatureEntity } from './feature.entity'
import { ProductEntity } from './product.entity'

@Entity('product_feature')
export class ProductFeatureEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({
    nullable: false,
    name: 'value'
  })
  value!: string

  @ManyToOne(
    () => ProductEntity,
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (product) => product.features
  )
  @JoinColumn({ name: 'product_id' })
  product!: Promise<ProductEntity>

  @ManyToOne(
    () => FeatureEntity,
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (feature) => feature.products
  )
  @JoinColumn({ name: 'feature_id' })
  feature!: Promise<FeatureEntity>
}