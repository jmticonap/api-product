import 'reflect-metadata'

import { env } from 'process'
import * as fs from 'fs'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import errorHandler from './middlewares/error.middleware'
import productRoute from './routes/product.route'
import categoryRoute from './routes/category.route'
import utilityRoute from './routes/utility.route'

const app = express()

const { LOG_PATH } = env

app.use(cors())
app.use(express.json())
app.use(morgan('dev', {
  stream: fs.createWriteStream(LOG_PATH !== undefined ? LOG_PATH : './access.log', { flags: 'a' })
}))
app.use(morgan('dev'))

app.use('/api/product', productRoute)
app.use('/api/category', categoryRoute)
app.use('/api/utility', utilityRoute)

app.use(errorHandler)

export default app
