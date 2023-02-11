/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import productController from '../controllers/product.controller'
import apicache from 'apicache'
import productCreateValidator from '../validators/productCreate.validator'

const route = express.Router()

const cache = apicache.middleware

// Page with list of products
route.get('/', productController.index)

// Show especific product selected by id
route.get('/:id', cache('1 minutes'), productController.findById)

// Show a page with products filter by Category
route.get('/by_category/:id', cache('1 minutes'), productController.findByCategory)

// Create new product
route.post('/', productCreateValidator, productController.create)

// Update especific product by id
route.put('/:id', productController.update)

// update the category in especific product
route.put('/:id/set_category', productController.setCategory)

export default route
