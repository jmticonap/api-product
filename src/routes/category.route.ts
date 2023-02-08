/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import categoryController from '../controllers/category.controller'
import apicache from 'apicache'
import categoryCreateValidator from '../validators/categoryCreate.validator'

const route = express.Router()

const cache = apicache.middleware

// Page with list of categories
route.get('/', cache('5 minutes'), categoryController.index)

// Show especific cateogry selected by id
route.get('/:id', cache('1 minutes'), categoryController.findById)

// Create new category
route.post('/', categoryCreateValidator, categoryController.create)

// Update especific category by id
route.put('/:id', categoryController.update)

export default route
