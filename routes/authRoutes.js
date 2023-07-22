const express = require('express')
const authMdwr = require('../middlewares/auth')
const authCtrl = require('../controllers/auth')

const authRouter = express.Router()

authRouter.post('/register', authMdwr.checkRegisterData, authCtrl.register) 
authRouter.post('/login', authCtrl.login)
authRouter.post('/logout', authMdwr.protect, authCtrl.logout)

module.exports = authRouter