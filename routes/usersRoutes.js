const express = require('express')
const usersMdwr = require('../middlewares/users')
const authMdwr = require('../middlewares/auth')
const usersCtrl = require('../controllers/users')
const { uploadTmp } = require('../services/multer/')

const usersRouter = express.Router()

usersRouter.get('/current', authMdwr.protect, usersCtrl.getCurrentUser) 
usersRouter.patch('/', authMdwr.protect, usersMdwr.checkUpdateData, uploadTmp.single('avatar'), usersMdwr.updateImage, usersCtrl.updateUserData)

module.exports = usersRouter