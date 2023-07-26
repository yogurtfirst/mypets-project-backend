const { Notices } = require("../../models");
const { catchAsync, AppError } = require("../../utils");
const { deleteOnCloudinary } = require('../../services/cloudinary');
const { Types } = require("mongoose");

exports.deleteNotice = catchAsync(async (req, res) => {
  const { noticeId } = req.params;
  const userId = req.user.id;

  const isIdValid = Types.ObjectId.isValid(noticeId);

  if (!isIdValid) throw new AppError(404, "Not found");

  const result = await Notices.findOneAndDelete({
    _id: noticeId,
    owner: userId,
  });

  if (!result) throw new AppError(404, "Not found");

  await deleteOnCloudinary(result.photoId)

  res.status(200).json({
    message: 'Notice has been removed',
  });
});
