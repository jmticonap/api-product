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
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    (product) => product.category
  )
  products!: Promise<ProductEntity[]>
}
