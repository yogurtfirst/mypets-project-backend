const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const { Users } = require('../../models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    console.log(profile);
    const { email, displayName, picture } = profile;
    const user = await Users.findOne({ email });
    if (user) {
      return done(null, user);
    }
    const password = await bcrypt.hash(uuid.v4(), 10);
    const avatarURL = picture;
    const newUser = await Users.create({
      email,
      password,
      name: displayName,
      avatarURL,
    });
    done(null, newUser);
  } catch (e) {
    done(e, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;
