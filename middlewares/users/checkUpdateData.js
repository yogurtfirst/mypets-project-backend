const { catchAsync, AppError, updateUserDataValidator } = require('../../utils')

exports.checkUpdateData = catchAsync(async (req, res, next) => {
    const { error, value } = updateUserDataValidator(req.body)
  
    if (error) throw new AppError(400, 'Invalid user data')
  
    req.body = value
  
    next()
  })