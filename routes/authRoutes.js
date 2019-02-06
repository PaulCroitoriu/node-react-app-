const passport = require('passport');


module.exports = app => {
  app.get('/auth/google',
    passport.authenticate("google", {
      scope: ['profile', 'email']
    })
  );

  // app.get('/auth/linkedIn',
  //   passport.authenticate("linkedin", {
  //      state: 'SOME STATE'
  //   })
  // );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', function (req, res) {
    req.logout();
    res.send("Goodbye " + req.user + ", hope we'll see you back soon!");
  });

  // app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  // successRedirect: '/',
  // failureRedirect: '/login'
  // }));

  app.get('/api/current-user', (req, res) => {
      res.send("Salut, " + req.user.name);
  });
};
