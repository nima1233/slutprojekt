const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'name' }, (uName, password, done) => {
      // Match user
      User.findOne({
        name: uName
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That name is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(name, done) {
    done(null, name.id);
  });

  passport.deserializeUser(function(id, done) {
    name.findById(id, function(err, name) {
      done(err, name);
    });
  });
};