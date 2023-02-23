/* eslint-disable @typescript-eslint/indent */
import { PrimaryGeneratedColumn } from 'typeorm'

export class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string
}
