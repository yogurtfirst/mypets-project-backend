const { AppError, catchAsync, signToken } = require('../../utils')
const { Users } = require('../../models')

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body
  
    const user = await Users.findOne({ email }).select('+password')
    
    if (!user) throw new AppError(401, 'Not authorized!')
    
    const passwordIsValid = await user.checkPassword(password, user.password)
  
    if (!passwordIsValid) throw new AppError(401, 'Not authorized!')
  
    const token = signToken(user.id)

    user.token = token

    await user.save()

    user.token = undefined
    user.password = undefined
    
    res.status(200).json({
      user,
      token
    })
  })