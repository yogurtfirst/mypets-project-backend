const { MyPets } = require("../../models/");
const { catchAsync } = require("../../utils");

exports.listMyPets = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const pets = await MyPets.find({ owner: userId });

  if (!pets)
    return res.status(404).json({
      message: "You have no pets",
    });

  res.status(200).json({ pets });
});
