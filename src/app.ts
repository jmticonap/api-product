import 'reflect-metadata'

import * as fs from 'fs'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import errorHandler from './middlewares/error.middleware'
import productRoute from './routes/product.route'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}))
app.use(morgan('dev'))

app.use('/api/product', productRoute)

app.use(errorHandler)

export default app
