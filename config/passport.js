const User = require('mongoose').model('User');

const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');

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
                done(null, user, {
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
    optionsJWT.passReqToCallback = true;

    passport.use(new JWTStrategy(optionsJWT, (req, jwt_payload, done) => {
        User.findOne({_id: jwt_payload.id})
        .then(user => {
            if (!user || (req.headers.authorization !== `bearer ${user.token}`)) {
                return done(null, false);
            }
            return done(null, user);
        })
        .catch(err => {
            return done(err);
        });
    }
    ));
};