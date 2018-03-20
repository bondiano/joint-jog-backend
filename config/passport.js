const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../app/user/model');
const config = require('./config');

module.exports = (passport) => {
    passport.use(new LocalStrategy({session: false}, (username, password, done) => 
        User.findOne({username})
        .then(user => {
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username or password.'
                });
            }
            return user.verifyPassword(password)
            .then(isMatch => {
                return done(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return done(null, false, {
                    message: 'Incorrect username or password.'
                });
            });
        })
        .catch(err => {
            return done(err);
        })
    ));

    const optionsJWT = {};
    optionsJWT.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    optionsJWT.secretOrKey = config.secret;

    passport.use(new JWTStrategy(optionsJWT, (jwt_payload, done) =>
        User.findOne({id: jwt_payload.id})
        .then((user) => {
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        })
    ));
};