const { Notices } = require("../../models");
const { catchAsync } = require("../../utils");

exports.listNotices = catchAsync(async (req, res) => {
  const notices = await Notices.find();

  res.status(200).json({ notices });
});
