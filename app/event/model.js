const mongoose = require('mongoose');

const { Schema } = mongoose;

const definition = {
    owner: {
        type: String,
        required: [true, 'Owner required']
    },
    subscribers: [Schema.Types.ObjectId],
    points: [{ x: Number, y: Number }],
    title: {
        type: String,
        validate: {
            validator: (v) =>  v.length < 144,
            message: 'Title must be short then 144 symbols!'
        }
    },
    describe: {
        type: String,
        validate: {
            validator: (v) =>  v.length < 501,
            message: 'Title must be short then 500 symbols!'
        }
    },
    date: {
        type: Date,
        required: [true, 'Date required']
    }
};

const options = {
    timestamps: true
};

const EventSchema = new Schema(definition, options);

EventSchema.pre('save', function (next) {
    if (this.isModified('subscribers') && this.subscribers.length < 1) {
        this.remove();
    } else {
        return next();
    }
});

module.exports = mongoose.model('Event', EventSchema);