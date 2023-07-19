const express = require('express')
const { swaggerService } = require('../services/swagger/swaggerService')

const swaggerRouter = express.Router()

swaggerRouter.get('/', swaggerService) 

module.exports = swaggerRouter