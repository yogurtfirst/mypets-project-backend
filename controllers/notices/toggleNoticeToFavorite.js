const { Types } = require('mongoose')
const { Notices } = require('../../models')
const { catchAsync, AppError } = require('../../utils')

exports.toggleNoticeToFavorite = catchAsync(async (req, res) => {
  const { id } = req.user
  const { noticeId } = req.params

  const isIdValid = Types.ObjectId.isValid(noticeId)

  if (!isIdValid) throw new AppError(400, "Bad request..")

  const notice = await Notices.findById(noticeId)
  
  if (notice.favorite.includes(id)) {
    notice.favorite = notice.favorite.pull(id)
  } else {
    notice.favorite.push(id)
  }

  await notice.save()

  res.status(200).json({
    notice,
  })
})