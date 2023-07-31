const { checkRegisterData } = require('./checkRegisterData');
const { protect } = require('./protect');
const passport = require('./googleAuthenticate');
const { checkLoginData } = require('./checkLoginData');

module.exports = {
  checkRegisterData,
  checkLoginData,
  protect,
  passport,
};
