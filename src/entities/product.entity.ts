/* eslint-disable @typescript-eslint/indent */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  genericCategory!: string

  @Column()
  brand!: string

  @Column('float')
  stock!: number

  @Column('float')
  price!: number
}
