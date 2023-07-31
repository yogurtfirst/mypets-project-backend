const { catchAsync, AppError } = require('../../utils')
const { Users } = require('../../models')
const { loginUserDataValidator } = require('../../services/auth')

exports.checkLoginData = catchAsync(async (req, res, next) => {
    const { error, value } = loginUserDataValidator(req.body)
  
    if (error) throw new AppError(400, error.message)
  
    const userExists = await Users.exists({ email: value.email })
  
    if (!userExists) throw new AppError(401, 'Email or password is wrong')
  
    req.body = value
  
    next()
  })