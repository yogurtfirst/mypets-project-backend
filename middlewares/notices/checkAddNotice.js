const { catchAsync, AppError } = require("../../utils");
const { addNoticeValidator } = require("../../services/notices");

exports.checkAddNotice = catchAsync(async (req, res, next) => {
  if (!req.body.photoURL) {
    const photoURL = `${req.protocol}://${req.get(
      "host"
    )}/pets/default_pet.jpg`;
    req.body.photoURL = photoURL;
  }

  const { error, value } = addNoticeValidator(req.body);

  if (error) return next(new AppError(400, error.message));

  req.body = value;

  next();
});
