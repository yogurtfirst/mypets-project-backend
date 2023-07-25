const { addNotice } = require("./addNotice");
const { deleteNotice } = require("./deleteNotice");
const { getNoticeById } = require("./getNoticeById");
const { listMyNotices } = require("./listMyNotices");
const { listNotices } = require("./listNotices");
const { toggleNoticeToFavorite } = require("./toggleNoticeToFavorite");
const { listFavorites } = require("./listFavorites");

module.exports = {
  addNotice,
  deleteNotice,
  getNoticeById,
  listNotices,
  listMyNotices,
  toggleNoticeToFavorite,
  listFavorites,
};
