const { Users } = require('../../models')
const { catchAsync, signToken } = require('../../utils')

exports.register = catchAsync(async (req, res) => {
    const newUserData = req.body
  
    const newUser = await Users.create(newUserData)

    const token = signToken(newUser.id)

    newUser.token = token
    newUser.avatarURL = `${req.protocol}://${req.get('host')}/avatars/default_user.png`

    await newUser.save()

    newUser.token = undefined
    newUser.password = undefined

  res.status(201).json({
    user: newUser,
    isNewUser: true,
    token,
  })
})