const express = require("express");
const noticesCtrl = require("../controllers/notices");
const noticesMdwr = require("../middlewares/notices");
const { protect } = require("../middlewares/auth");
const { uploadTmp } = require('../services/multer');
const { updateImage } = require('../middlewares/notices');

const noticesRouter = express.Router();

noticesRouter.get("/", noticesCtrl.listNotices);
noticesRouter.post(
  "/", 
  protect, uploadTmp.single('photo'), updateImage,
  noticesMdwr.checkAddNotice,
  noticesCtrl.addNotice
);
noticesRouter.get("/self", protect, noticesCtrl.listMyNotices);

noticesRouter.get("/:noticeId", noticesCtrl.getNoticeById);
noticesRouter.patch("/:noticeId", protect, noticesCtrl.toggleNoticeToFavorite);
noticesRouter.delete("/:noticeId", protect, noticesCtrl.deleteNotice);

module.exports = noticesRouter;
