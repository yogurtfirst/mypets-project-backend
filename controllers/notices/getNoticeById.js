const { Types } = require("mongoose");
const { Notices, Users } = require("../../models");
const { catchAsync, AppError } = require("../../utils");

exports.getNoticeById = catchAsync(async (req, res) => {
  const { noticeId } = req.params;

  const isIdValid = Types.ObjectId.isValid(noticeId);

  if (!isIdValid) throw new AppError(404, "Not found");

  const result = await Notices.findById(noticeId);

  if (!result) throw new AppError(404, "Not found");

  const { email, phone } = await Users.findById(result.owner)

  res.status(200).json({
    notice: {
      _id: result._id,
      noticeType: result.noticeType,
      title: result.title,
      name: result.name,
      birthday: result.birthday,
      petType: result.petType,
      sex: result.sex,
      location: result.location,
      price: result.price,
      comments: result.comments,
      photoURL: result.photoURL,
      favorite: result.favorite.length,
      isFavorite: result.favorite.includes(req.userId),
      createdAt: result.createdAt,
      ownerEmail: email,
      ownerPhone: phone,
    },
  });
});
