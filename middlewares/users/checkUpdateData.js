const { updateUserDataValidator } = require('../../services/users')
const { catchAsync, AppError } = require('../../utils')

exports.checkUpdateData = catchAsync(async (req, res, next) => {
    const { error, value } = updateUserDataValidator(req.body)
  console.log(error)
    if (error) throw new AppError(400, error.message)
  
    req.body = value
  
    next()
  })