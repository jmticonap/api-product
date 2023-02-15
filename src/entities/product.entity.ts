/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CategoryEntity } from './category.entity'
import { CategoryFeatureEntity } from './categoryFeature.entity'
import { ProductFeatureEntity } from './productFeature.entity'

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({
    nullable: false,
    unique: true
  })
  name!: string

  @Column({
    nullable: false
  })
  description!: string

  @Column({
    name: 'isactive',
    nullable: false,
    default: true
  })
  isActive!: boolean

  @Column({
    nullable: true
  })
  brand!: string

  @Column('float',
    {
      default: 0
    }
  )
  stock!: number

  @Column('float',
    {
      default: 0
    }
  )
  price!: number

  @ManyToOne(
    () => CategoryEntity,
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (category) => category.products
  )
  @JoinColumn({ name: 'categoryid' })
  category!: Promise<CategoryEntity>

  @OneToMany(
    () => ProductFeatureEntity,
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (productFeature) => productFeature.product
  )
  features!: Promise<CategoryFeatureEntity[]>
}
