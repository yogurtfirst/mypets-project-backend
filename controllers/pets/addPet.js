const { MyPets } = require("../../models");
const { catchAsync } = require("../../utils");

exports.addPet = catchAsync(async (req, res) => {
  const newPet = await MyPets.create({ ...req.body, owner: req.user.id });
  res.status(201).json({
    pet: newPet,
  });
});
