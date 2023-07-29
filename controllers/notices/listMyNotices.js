const noticeTypeEnum = require("../../constants/noticeTypeEnum");
const { catchAsync } = require("../../utils");
const { searchNoticeService } = require("../../services/notices/searchNoticeService");

exports.listMyNotices = catchAsync(async (req, res) => {
  const notices = await searchNoticeService(req.user.id, noticeTypeEnum.MY_ADS, req.query)

  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const paginatedNotices = notices.slice(skip, skip + limit);

  res.status(200).json({ data: paginatedNotices, total: notices.length });
});
