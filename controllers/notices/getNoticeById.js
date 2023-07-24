const { Types } = require("mongoose");
const { Notices } = require("../../models");
const { catchAsync, AppError } = require("../../utils");

exports.getNoticeById = catchAsync(async (req, res) => {
  const { noticeId } = req.params;

  const isIdValid = Types.ObjectId.isValid(noticeId);

  if (!isIdValid) throw new AppError(400, "Bad request..");

  const result = await Notices.findById(noticeId);

  if (!result) throw new AppError(404, "Notice not found");

  res.status(200).json({
    notice: result,
  });
});
