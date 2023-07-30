const { login } = require('./login');
const { logout } = require('./logout');
const { register } = require('./register');
const { googleAuth } = require('./googleAuth');

module.exports = {
  register,
  login,
  logout,
  googleAuth,
};
