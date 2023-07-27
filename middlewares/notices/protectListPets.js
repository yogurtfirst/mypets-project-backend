const jwt = require("jsonwebtoken");
const { catchAsync, AppError } = require("../../utils");
const { Users } = require("../../models");

exports.protectListPets = catchAsync(async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) return next();

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new AppError(401, "Not authorized");
  }

  const currentUser = await Users.findById(decoded.id);

  req.userId = currentUser.id;

  next();
});
