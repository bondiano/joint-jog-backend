const mongoose = require('mongoose');

const definition = {
    owner: {
        type: String,
        required: true
    },
    subscribers: [Schema.Types.ObjectId],
    points: [{ x: Number, y: Number }],
    title: String,
    describe: String,
    date: Date
};

const options = {
    timestamps: true
};

const eventSchema = new Schema(definition, options);

module.exports = mongoose.model('Event', eventSchema);