const { catchAsync } = require('../../utils')

exports.deleteNotice = catchAsync(async (req, res) => {

  res.status(200).json({message: 'This API works in test-mode'})
})