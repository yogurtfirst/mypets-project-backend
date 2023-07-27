const { catchAsync, AppError } = require("../../utils");
const { MyPets } = require("../../models");
const {deleteOnCloudinary} = require('../../services/cloudinary');
const { Types } = require("mongoose");

exports.deletePet = catchAsync(async (req, res) => {
  const { petId } = req.params;
  const userId = req.user.id;

  const isIdValid = Types.ObjectId.isValid(petId);

  if (!isIdValid) throw new AppError(404, "Not found");

  const {photoId, _id} = await MyPets.findOne({ _id: petId, owner: userId })
  
  if (!_id)
    return res.status(404).json({
      message: "Not found",
    });

  await deleteOnCloudinary(photoId)

  await MyPets.deleteOne({ _id: petId, owner: userId })

  res.sendStatus(200).json({message: 'Pet has been removed'});
});
