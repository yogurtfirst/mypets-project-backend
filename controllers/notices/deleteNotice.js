const { Notices } = require("../../models");
const { catchAsync, AppError } = require("../../utils");
const { deleteOnCloudinary } = require('../../services/cloudinary');

exports.deleteNotice = catchAsync(async (req, res) => {
  const { noticeId } = req.params;
  const userId = req.user.id;

  const result = await Notices.findOneAndDelete({
    _id: noticeId,
    owner: userId,
  });

  if (!result) throw new AppError(404, "Notice not found");

  await deleteOnCloudinary(result.photoId)

  res.status(204).json({
    notice: result,
  });
});
