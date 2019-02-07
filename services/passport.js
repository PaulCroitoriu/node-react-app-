const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// // register linkedIn Strategy
// passport.use(new LinkedInStrategy({
//   clientID: keys.linkedinClientID,
//   clientSecret: keys.linkedinClientSecret,
//   callbackURL: "http://127.0.0.1:5000/auth/linkedin/callback",
//   scope: ['r_emailaddress', 'r_basicprofile']
//
// }, (accessToken, refreshToken, profile, done) => {
//   User.findOne({ linkedIn: profile.id }).then(existingUser => {
//     if (existingUser) {
//       // we already have a record of the user in the database with the given google ID
//       done(null, existingUser);
//     } else {
//       // we don't have a user record with this ID, make a new record
//       new User({
//         linkedIn: profile.id ,
//         name : profile.displayName
//       }).save().then(user => done(null, user));
//     }
//     });
//   })
// );


// register Google Strategy
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret : keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true

}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }).then(existingUser => {
      if (existingUser) {
        // we already have a record of the user in the database with the given google ID
        done(null, existingUser);
      } else {
        // we don't have a user record with this ID, make a new record
        new User({
          googleId: profile.id ,
          name : profile.displayName
        }).save().then(user => done(null, user));
      }
    });
  })
);
