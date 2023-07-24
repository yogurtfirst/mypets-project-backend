const { catchAsync, AppError } = require('../../utils')
const { Users } = require('../../models')
const { registerUserDataValidator } = require('../../services/users')

exports.checkRegisterData = catchAsync(async (req, res, next) => {
    const { error, value } = registerUserDataValidator(req.body)
  
    if (error) throw new AppError(400, 'Invalid user data')
  
    const userExists = await Users.exists({ email: value.email })
  
    if (userExists) throw new AppError(400, 'User with this email already exist')
  
    req.body = value
  
    next()
  })