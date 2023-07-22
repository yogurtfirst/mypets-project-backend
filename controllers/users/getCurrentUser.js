const { catchAsync } = require('../../utils')

exports.getCurrentUser = catchAsync(async (req, res) => {
  const {user} = req
  user.token = undefined

  res.status(200).json({user})
})