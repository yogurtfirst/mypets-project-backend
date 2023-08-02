const express = require("express");
const noticesCtrl = require("../controllers/notices");
const noticesMdwr = require("../middlewares/notices");
const { protect } = require("../middlewares/auth");
const { uploadTmp } = require("../services/multer");
const { updateImage } = require("../middlewares/notices");

const noticesRouter = express.Router();

noticesRouter.get("/", noticesMdwr.protectListPets, noticesCtrl.listNotices);
noticesRouter.post(
  "/",
  protect,
  uploadTmp.single("photo"),
  updateImage,
  noticesMdwr.checkAddNotice,
  noticesCtrl.addNotice
);
noticesRouter.get("/favorites", protect, noticesCtrl.listFavorites);
noticesRouter.get("/self", protect, noticesCtrl.listMyNotices);

noticesRouter.get("/:noticeId", noticesMdwr.protectListPets, noticesCtrl.getNoticeById);
noticesRouter.patch("/favorites/:noticeId", protect, noticesCtrl.toggleNoticeToFavorite);
noticesRouter.delete("/:noticeId", protect, noticesCtrl.deleteNotice);

module.exports = noticesRouter;
