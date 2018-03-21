const jwt = require('jsonwebtoken');
const passport = require('passport');
const {secret} = require('../../config/config');

const reprepository = require('./repository');
const User = require('./model');

exports.login = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.loginError(user, 
                info ? info.message : 'Login failed');
        }

        req.login(user, {session: false}, (err) => { 
            if (err) {
                return res.send(err);
            }
            const payload = {
                id: user.id,
                username: user.username
            };
            const token = jwt.sign(payload, secret);
            reprepository.findUserByID(user.id)
            .then(user => user.set({token: token}).save())
            .then(() => res.success({user: payload, token}))
            .catch(err => res.serverError());
        });
    })(req, res);
};

exports.register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    if(!username || username.length < 6) {
        return res.validationError({
            errors: [{
                path: 'username',
                message: 'Please pass username'
            }]
        });
    }

    if(!password) {
        return res.validationError({
            errors: [{
                path: 'password',
                message: 'Please pass password'
            }]
        });
    }

    if(!email) {
        return res.validationError({
            errors: [{
                path: 'email',
                message: 'Please pass email'
            }]
        });
    }

    reprepository.saveUser({
        username,
        password,
        email
    }, (err) => {
        if (err) {
            return res.validationError(err);
        }
        return res.success({message: 'Successful created new user'});
    });
};

exports.profile = (req, res) => {
    const username = req.params.username;
    reprepository.findUserByUsername(username)
    .then(user => {
        if (!user) {
            return res.notFound();
        }
        const userInfo = reprepository.getUserPublicInfo(user);
        return res.success(userInfo);
    })
    .catch(err => {
        return res.serverError(err);
    });
};

exports.currentUser = (req, res) => {
    const userInfo = reprepository.getUserPublicInfo(req.user);
    return res.success(userInfo);
};

exports.editProfile = (req, res) => {
    return reprepository.editUser(req.user, req.body, (err) => {
        if (err) {
            return res.validationError(err);
        }
        return res.success({message: 'Successful edit profile'});
    });
};