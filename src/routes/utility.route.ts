/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import utilityController from '../controllers/utility.controller'

const route = express.Router()

// Create schema for the DB with zero data
route.get('/create_schema_db', utilityController.ceateSchemaDB)

// Populate DB with data for try out purpose
route.get('/initialize_db', utilityController.initializeDB)

export default route
