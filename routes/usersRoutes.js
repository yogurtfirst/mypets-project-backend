const express = require('express')
const usersMdwr = require('../middlewares/users')
const authMdwr = require('../middlewares/auth')
const usersCtrl = require('../controllers/users')
const { uploadTmp, updateImage } = require('../middlewares/users')


const usersRouter = express.Router()

usersRouter.get('/current', authMdwr.protect, usersCtrl.getCurrentUser) 
usersRouter.patch('/', authMdwr.protect, usersMdwr.checkUpdateData, uploadTmp.single('avatar'), updateImage, usersCtrl.updateUserData)

module.exports = usersRouter