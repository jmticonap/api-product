/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import featureController from '../controllers/feature.controller'
import apicache from 'apicache'

import validatorHandlers from '../middlewares/validator.middleware'

const route = express.Router()

const cache = apicache.middleware

// Page with list of categories
route.get('/', cache('5 minutes'), featureController.index)

// Show especific cateogry selected by id
route.get('/:id', cache('1 minutes'), featureController.findById)

// Create new category
route.post('/', validatorHandlers.featureCreate, featureController.create)

// Update especific category by id
route.put('/:id', validatorHandlers.featureUpdate, featureController.update)

export default route
