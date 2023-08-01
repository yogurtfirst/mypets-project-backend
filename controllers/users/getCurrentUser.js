const { catchAsync } = require('../../utils')

exports.getCurrentUser = catchAsync(async (req, res) => {
  const {user} = req

  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      birthday: user.birthday,
      city: user.city,
      avatarURL: user.avatarURL,
    }
  })
})