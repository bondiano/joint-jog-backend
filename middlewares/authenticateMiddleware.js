const passport = require('passport');

module.exports = (req, res, next) => {
    return passport.authenticate('jwt', {session: false}, (err, user, info) => {
        console.log(user);
        if (!user) { 
            return res.unauthorized();
        }
        req.user = user;
        return next();
    })(req, res, next);
};