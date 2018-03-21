module.exports = (app) => {
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    const handler = require('./handler')(io);
};
