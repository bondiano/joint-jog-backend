const User = require('mongoose').model('User');
const Event = require('mongoose').model('Event');
const types = require('./types');
const GLOBAL = 'global';

const joinToRooms = async (io, client, data) => {
    const userSubscribed = await User.findById(data.id).select('subscribed');
    userSubscribed.forEach(event => {
        client.join(event);
    });
    client.join(GLOBAL);
};

const newSubscriber = (io, client, data) => {
    client.join(data.id);
    io.to(data.id).emit('action', {type: types.NEW_SUBSCRIBER_SUCCESS, payload: {username: data.username}});
};

const newEvent = (io, client, data) => {
    const event = Event.findById(data.id);
    io.to(GLOBAL).emit('action', {type: types.NEW_EVENT_SUCCESS, payload: event});
};

const unsubscribe = (io, client, data) => {
    client.leave(data.id);
    io.to(data.id).emit('action', {type: types.UNSUBSCRIBED_SUCCESS, payload: {username: data.username}});
};

module.exports = (io) => {
    
    const disconnected = () => {
        console.log('DISCONNECT');
    };
    
    const onConnect = (client) => {
        console.log('Socket ID:', client.id);

        client.on('action', (_data) => {
            const data = JSON.parse(_data);
            switch(data.type) {
                case(types.CONNECT):
                    return joinToRooms(io, client, data);
                case(types.NEW_EVENT_REQUEST):
                    return newEvent(io, client, data);
                case(types.NEW_SUBSCRIBER_REQUEST):
                    return newSubscriber(io, client, data);
                case(types.UNSUBSCRIBED_REQUEST):
                    return unsubscribe(io, client, data);
                default:
                    return;
            }
        });

        client.on('disconnect', disconnected);
    };

    io.on('connection', onConnect);
};