const { updateUserDataValidator } = require('../../services/users')
const { catchAsync, AppError, checkDate } = require('../../utils')

exports.checkUpdateData = catchAsync(async (req, res, next) => {
    const { error, value } = updateUserDataValidator(req.body)
  
    if (error) throw new AppError(400, error.message)
    if(!checkDate(value.birthday)) throw new AppError(400, "The birthday couldn't be in future")
  
    req.body = value
  
    next()
  })