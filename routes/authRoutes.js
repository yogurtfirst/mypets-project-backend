const express = require('express');
const authMdwr = require('../middlewares/auth');
const authCtrl = require('../controllers/auth');

const authRouter = express.Router();

authRouter.get(
  '/google',
  authMdwr.passport.authenticate('google', { scope: ['email', 'profile'] })
);
authRouter.get(
  '/google/callback',
  authMdwr.passport.authenticate('google', { session: false }),
  authCtrl.googleAuth
);

authRouter.post('/register', authMdwr.checkRegisterData, authCtrl.register);
authRouter.post('/login', authCtrl.login);
authRouter.post('/logout', authMdwr.protect, authCtrl.logout);

module.exports = authRouter;
