const express = require('express')
// const usersMdwr = require('../middlewares/users')
const usersCtrl = require('../controllers/users')

const usersRouter = express.Router()

usersRouter.get('/current', usersCtrl.getCurrentUser) 
usersRouter.patch('/:userid', usersCtrl.updateUserData)

module.exports = usersRouter