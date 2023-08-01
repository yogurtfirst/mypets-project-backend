const { AppError, catchAsync, signToken } = require('../../utils')
const { Users } = require('../../models')

exports.login = catchAsync(async (req, res) => {
    const { email, password } = req.body

    const user = await Users.findOne({ email }).select('+password')
    
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