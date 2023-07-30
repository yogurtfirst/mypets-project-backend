const { Users } = require('../../models');
const { catchAsync, signToken } = require('../../utils');

exports.googleAuth = catchAsync(async (req, res) => {
  const { _id: id, name } = req.user;
  const token = signToken(id);

  await Users.findByIdAndUpdate(id, { token });

  res.redirect(
    `https://nmarkhotsky.github.io/your-pet-project-front/?token=${token}&name=${name}`
  );
});
