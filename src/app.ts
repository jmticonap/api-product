import * as fs from 'fs'
import express from 'express'
import morgan from 'morgan'

import errorHandler from './middlewares/error.middleware'
import productRoute from './routes/product.route'

const app = express()

app.use(express.json())
app.use(morgan('dev', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}))
app.use(morgan('dev'))

app.get('/ping', (_req, res) => {
  res.status(200).json({
    message: "pong pong"
  })
})
app.use('/product', productRoute)

app.use(errorHandler)

export default app