const mongoose = require('mongoose');
const Schema = mongoose;

const definition = {
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subscribed: [Schema.Types.ObjectId]
};

const options = {
    timestamps: true
};

const userSchema = new Schema(definition, options);

module.exports = mongoose.model('User', userSchema);