const { Notices } = require("../../models");
const { catchAsync, AppError } = require("../../utils");
const noticeTypeEnum = require("../../constants/noticeTypeEnum");

exports.listNotices = catchAsync(async (req, res) => {
  const { noticeType } = req.body;
  const hasAccessToFavorites = req.hasAccessToFavorites;

  if (noticeType && Object.values(noticeTypeEnum).includes(noticeType)) {
    const notices = await Notices.find({ noticeType });
    return res.status(200).json({ notices });
  }

  if (hasAccessToFavorites) {
    const notices = await Notices.find({ favorite: req.user.id });
    return res.status(200).json({ notices });
  }

  throw new AppError(400, "Bad Request");
});
