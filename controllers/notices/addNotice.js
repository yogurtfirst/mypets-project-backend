const { catchAsync } = require("../../utils");
const { Notices } = require("../../models");

exports.addNotice = catchAsync(async (req, res) => {
  const newNotice = await Notices.create({ ...req.body, owner: req.user.id });

  res.status(201).json({
    notice: newNotice,
  });
});
