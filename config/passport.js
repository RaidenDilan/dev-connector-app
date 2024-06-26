const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const { secret } = require('./environment');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, (payload, done) => {
    User
      .findById(payload.id)
      .then((user) => {
        if (user) return done(null, user);
        return done(null, false);
      })
      .catch(err => console.log(err));
  }));
};
