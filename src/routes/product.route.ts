/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import productController from '../controllers/product.controller'
import apicache from 'apicache'

const route = express.Router()

const cache = apicache.middleware

// Page with list of products
route.get('/', cache('5 minutes'), productController.index)

// Show especific product selected by id
route.get('/:id', cache('1 minutes'), productController.findById)

// Create new product
route.post('/', productController.create)

// Update especific product by id
route.put('/:id', productController.update)

export default route
