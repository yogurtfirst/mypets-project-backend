const { catchAsync } = require('../../utils')

exports.updateUserData = catchAsync(async (req, res) => {

  res.status(200).json({message: 'This API works in test-mode'})
})