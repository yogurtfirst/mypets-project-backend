const { catchAsync } = require('../../utils')

exports.getNoticeById = catchAsync(async (req, res) => {

  res.status(200).json({message: 'This API works in test-mode'})
})