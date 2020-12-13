const driver = require('./config/db');
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
    passport.use(
        new localStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            const session = driver.session();
            session.run(
                `Match(s) WHERE s.email=$email return s, ID(s)`, { email: email }
            ).then( (users, err) => {
                // console.log('hello from password');
                session.close();
                // users.records.forEach(record=>console.log(record._fields[0].properties.email))
                user = users.records[0]._fields[0].properties;
                user.id = users.records[0]._fields[1];
                // console.log("hello: ", user);
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                });
        } ).catch(err => console.log(err)

        )
        
        })
    );

  passport.serializeUser((user, cb) => {
    cb(null, user.email);
  });
  passport.deserializeUser((email, cb) => {
    const session = driver.session();
    session.run(
        `Match(s) WHERE s.email=$email return s, ID(s)`, { email: email }
    ).then( (users, err) => {
        session.close();
        user = users.records[0]._fields[0].properties;
        user.id = users.records[0]._fields[1];
        const userInformation = {
        id: user.id,
      };
      cb(err, userInformation);
    }).catch( e=> console.log(e)
    )
});
  
};

  