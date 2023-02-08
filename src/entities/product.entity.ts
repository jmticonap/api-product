/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CategoryEntity } from './category.entity'

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number

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
    (categoryEntity) => categoryEntity.products
  )
  categoryEntity!: CategoryEntity
}
