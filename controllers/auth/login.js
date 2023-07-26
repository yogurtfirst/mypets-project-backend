const { AppError, catchAsync, signToken } = require('../../utils')
const { Users } = require('../../models')

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password ) throw new AppError(400, 'Bad request')
  
    const user = await Users.findOne({ email }).select('+password')
    
    if (!user) throw new AppError(401, 'Email or password is wrong')
    
    const passwordIsValid = await user.checkPassword(password, user.password)
  
    if (!passwordIsValid) throw new AppError(401, 'Email or password is wrong')
  
    const token = signToken(user.id)

    user.token = token

    await user.save()

    res.status(200).json({
      user: {
        name: user.name,
      },
      token
    })
  })