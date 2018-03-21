const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    bcrypt = require('bcrypt-nodejs');

const validateEmail = require('../../utils/validateEmail');    
const { Schema } = mongoose;

const definition = {
    username: {
        type: String,
        unique: true,
        validate: {
            validator: (v) =>  v.length > 5,
            message: '{VALUE} is not a valid username!'
        },
        required: [true, 'Username required']
    },
    password: {
        type: String,
        validate: {
            validator: (v) =>  v.length > 5,
            message: '{VALUE} is not a valid password!'
        },
        select: false,
        required: [true, 'Password required']
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: validateEmail,
            message: '{VALUE} is not a valid email!'
        },
        required: [true, 'Email required']
    },
    socialNetworks: [{type: String, url: String}],
    firstName: String,
    lastName: String,
    age: { 
        type: Number, 
        validate: {
            validator: (v) => v > 13,
            message: 'Age must be more then 14!'
        },
    },
    sex: { 
        type: String, 
        enum: ['male', 'female'] 
    },
    token: String,
    subscribed: [Schema.Types.ObjectId]
};

const options = {
    timestamps: true
};

const UserSchema = new Schema(definition, options);

UserSchema.pre('save', function (next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.verifyPassword = function (password, cb) {
    return new Promise((resolve, reject) => bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return reject(err);
        }
        resolve(isMatch);
    }));
};

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);