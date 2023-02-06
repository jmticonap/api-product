import express from 'express'
import productController from '../controllers/product.controller'

const route = express.Router()

// Page with list of products
route.get('/', productController.index)

// Show especific product selected by id
route.get('/:id', productController.findById)

// Create new product
route.post('/', productController.create)

// Update especific product by id
route.put('/:id', productController.update)

export default route
