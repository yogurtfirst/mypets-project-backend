const { Notices } = require("../../models");
const { catchAsync } = require("../../utils");

exports.listMyNotices = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;

  const myNotices = await Notices.find({ owner: userId });

  if (myNotices.length === 0)
    return res.status(200).json({
      data: [], total: 0,
    });

  const paginatedNotices = myNotices.slice(skip, skip + limit);

  res.status(200).json({ data: paginatedNotices, total: myNotices.length });
});
