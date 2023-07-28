const { catchAsync } = require("../../utils");
const { Notices } = require("../../models");

exports.addNotice = catchAsync(async (req, res) => {
  await Notices.create({ ...req.body, owner: req.user.id });

  res.status(201).json({
    message: "Your ad has been created",
  });
});
