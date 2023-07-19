const express = require('express')
// const authMdwr = require('../middlewares/auth')
const authCtrl = require('../controllers/auth')

const authRouter = express.Router()

authRouter.post('/register', authCtrl.register) 
authRouter.post('/login', authCtrl.login)
authRouter.post('/logout', authCtrl.logout)

module.exports = authRouter