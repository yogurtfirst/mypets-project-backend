const { catchAsync } = require('../../utils')

exports.toggleNoticeToFavorite = catchAsync(async (req, res) => {

  res.status(200).json({message: 'This API works in test-mode'})
})