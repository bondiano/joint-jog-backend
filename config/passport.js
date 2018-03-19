const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');

// load up the user model
const User = require('../app/user/model');
const config = require('../config'); // get db config file

module.exports = (passport) => {

    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;

    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        User.findOne({id: jwt_payload.id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};