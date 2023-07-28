const { MyPets } = require("../../models");
const { catchAsync } = require("../../utils");

exports.addPet = catchAsync(async (req, res) => {
  await MyPets.create({ ...req.body, owner: req.user.id });
  
  res.status(201).json({
    message: 'Your pet is added' 
  });
});
