const jwt = require("jsonwebtoken");

const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { Users } = require("../../models");

exports.checkAccessToFavorite = catchAsync(async (req, res, next) => {
  const { favorite } = req.body;

  if (!favorite) return next();

  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new AppError(401, "Not authorized");
  }

  const currentUser = await Users.findById(decoded.id);

  if (!currentUser || currentUser.token !== token)
    throw new AppError(401, "Not authorized");
  currentUser.token = undefined;

  req.user = currentUser;
  req.hasAccessToFavorites = true;

  next();
});
