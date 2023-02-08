/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ProductEntity } from './product.entity'

@Entity('category')
export class CategoryEntity {
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

  @OneToMany(
    () => ProductEntity,
    (product) => product.categoryEntity
  )
  products!: ProductEntity[]
}
