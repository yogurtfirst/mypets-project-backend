const { listNoticesValidator } = require("../../services/notices");
const { catchAsync, AppError } = require("../../utils");

exports.checkListNotices = catchAsync(async (req, res, next) => {
  const { error, value } = listNoticesValidator(req.body);

  if (error) return next(new AppError(400, error.message));

  req.body = value;

  next();
});
