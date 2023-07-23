const { Types } = require("mongoose");
const { catchAsync, AppError } = require("../../utils");
const { MyPets } = require("../../models");
const {deleteOnCloudinary} = require('../../services/cloudinary')

exports.deletePet = catchAsync(async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;

  const isIdValid = Types.ObjectId.isValid(petId);

  if (!isIdValid) throw new AppError(400, "Bad request..");

  const {photoId, _id} = await MyPets.findOne({ _id: petId, owner: userId })
  
  await deleteOnCloudinary(photoId)

  await MyPets.deleteOne({ _id: petId, owner: userId })

  if (!_id)
    return res.status(404).json({
      message: "There is no pet with this id",
    });

  res.sendStatus(204);
});
