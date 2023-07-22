const { Users } = require('../../models')
const { catchAsync } = require('../../utils')

exports.logout = catchAsync(async (req, res) => {
  const { id } = req.user
    
  const user = await Users.findById( id )
  user.token = null
  await user.save()
 
  res.status(204).json('Logged out')
})