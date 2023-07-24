const express = require("express");
const noticesCtrl = require("../controllers/notices");
const noticesMdwr = require("../middlewares/notices");
const { protect } = require("../middlewares/auth");

const noticesRouter = express.Router();

noticesRouter.get("/", noticesCtrl.listNotices);
noticesRouter.post(
  "/",
  protect,
  noticesMdwr.checkAddNotice,
  noticesCtrl.addNotice
);
noticesRouter.get("/self", protect, noticesCtrl.listMyNotices);

noticesRouter.get("/:noticeId", noticesCtrl.getNoticeById);
noticesRouter.patch("/:noticeId", protect, noticesCtrl.toggleNoticeToFavorite);
noticesRouter.delete("/:noticeId", protect, noticesCtrl.deleteNotice);

module.exports = noticesRouter;
