const { Notices } = require("../../models");
const { catchAsync } = require("../../utils");
const noticeTypeEnum = require("../../constants/noticeTypeEnum");

exports.listNotices = catchAsync(async (req, res) => {
  let noticeType;

  Object.values(noticeTypeEnum).includes(req.query.type)
    ? (noticeType = req.query.type)
    : (noticeType = noticeTypeEnum.SELL);

  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const notices = await Notices.find({ noticeType });

  if (notices.length === 0)
    return res.status(200).json({
      data: [], total: 0,
    });

  const paginatedNotices = notices.slice(skip, skip + limit);

  res.status(200).json({ data: paginatedNotices, total: notices.length });
});
