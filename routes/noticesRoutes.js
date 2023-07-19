const express = require('express')
// const noticesMdwr = require('../middlewares/notices')
const noticesCtrl = require('../controllers/notices')

const noticesRouter = express.Router()

noticesRouter.get('/', noticesCtrl.listNotices) 
noticesRouter.get('/:noticeid', noticesCtrl.getNoticeById) 
noticesRouter.post('/', noticesCtrl.addNotice) 
noticesRouter.get('/self', noticesCtrl.listMyNotices) 
noticesRouter.patch('/favorites', noticesCtrl.toggleNoticeToFavorite) 
noticesRouter.delete('/:noticeid', noticesCtrl.deleteNotice)

module.exports = noticesRouter