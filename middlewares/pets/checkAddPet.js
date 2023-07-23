const { addPetValidator } = require("../../services/pets");
const { catchAsync, AppError } = require("../../utils");

exports.checkAddPet = catchAsync(async (req, res, next) => {
  if (!req.body.photoURL) {
    const photoURL = `${req.protocol}://${req.get('host')}/pets/default_pet.jpg`
    req.body.photoURL = photoURL
  }

  const { error, value } = addPetValidator(req.body);

  if (error) return next(new AppError(400, error.message));

  req.body = value;

  next();
});
