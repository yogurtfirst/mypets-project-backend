const { checkRegisterData } = require('./checkRegisterData');
const { protect } = require('./protect');
const passport = require('./googleAuthenticate');

module.exports = {
  checkRegisterData,
  protect,
  passport,
};
