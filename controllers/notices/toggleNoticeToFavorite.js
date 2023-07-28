const { Types } = require('mongoose')
const { Notices, Users } = require('../../models')
const { catchAsync, AppError } = require('../../utils')

exports.toggleNoticeToFavorite = catchAsync(async (req, res) => {
  const { id } = req.user
  const { noticeId } = req.params

  const isIdValid = Types.ObjectId.isValid(noticeId)

  if (!isIdValid) throw new AppError(404, "Not found")

  const notice = await Notices.findById(noticeId)

  if (!notice) throw new AppError(404, "Not found")
  
  if (notice.favorite.includes(id)) {
    notice.favorite = notice.favorite.pull(id)
  } else {
    notice.favorite.push(id)
  }

  await notice.save()

  const { email, phone } = await Users.findById(notice.owner)

  res.status(201).json({
    notice: {
      _id: notice._id,
      noticeType: notice.noticeType,
      title: notice.title,
      name: notice.name,
      birthday: notice.birthday,
      petType: notice.petType,
      sex: notice.sex,
      location: notice.location,
      price: notice.price,
      comments: notice.comments,
      photoURL: notice.photoURL,
      favorite: notice.favorite.length,
      isFavorite: false,
      createdAt: notice.createdAt,
      ownerEmail: email,
      ownerPhone: phone,
    }
  })
})