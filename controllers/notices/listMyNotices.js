const { Notices } = require("../../models");
const { catchAsync } = require("../../utils");

exports.listMyNotices = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const myNotices = await Notices.find({ owner: userId });

  if (!myNotices)
    return res.status(404).json({
      message: "You have no notices",
    });

  res.status(200).json({ myNotices });
});
