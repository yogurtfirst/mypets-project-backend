const express = require('express')
// const usersMdwr = require('../middlewares/users')
const authMdwr = require('../middlewares/auth')
const usersCtrl = require('../controllers/users')

const usersRouter = express.Router()

usersRouter.get('/current', authMdwr.protect, usersCtrl.getCurrentUser) 
usersRouter.patch('/:userid', usersCtrl.updateUserData)

module.exports = usersRouter