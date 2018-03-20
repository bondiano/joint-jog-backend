const User = require('./model');

exports.login = (req, res) => {
    res.json({ title: 'user' });    
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

    const newUser = new User({
        username,
        password,
        email
    });

    newUser.save(err => {
        if (err) {
            return res.validationError(err);
        }
        return res.success({message: 'Successful created new user'});
    });
};

exports.auth = (req, res) => {

};

exports.profile = (req, res) => {

};

exports.currentUser = (req, res) => {

};