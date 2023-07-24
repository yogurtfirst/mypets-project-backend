const { catchAsync } = require('../../utils')

exports.updateUserData = catchAsync(async (req, res) => {
  const { user } = req

  Object.keys(req.body).forEach((key) => {
    user[key] = req.body[key]
  })

  user.token = req.token
  await user.save()
  user.token = undefined
  
  res.status(200).json({user})
})