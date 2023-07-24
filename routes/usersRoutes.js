const express = require('express')
const usersMdwr = require('../middlewares/users')
const authMdwr = require('../middlewares/auth')
const usersCtrl = require('../controllers/users')
const { uploadTmp } = require('../services/multer/')

const usersRouter = express.Router()

usersRouter.get('/', authMdwr.protect, usersCtrl.getCurrentUser) 
usersRouter.patch('/', authMdwr.protect, uploadTmp.single('avatar'), usersMdwr.updateImage, usersMdwr.checkUpdateData, usersCtrl.updateUserData)

module.exports = usersRouter