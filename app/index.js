const userRouter = require('./user/routes');
const eventRouter = require('./event/routes');

module.exports = (app) => {
    app.use('/user', userRouter);
    app.use('/event', eventRouter);

    app.get('/', (req, res) => {
        // language=HTML
        res.send(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
        <script>
            const socket = io.connect('http://localhost:3000');
            console.log('START');
            socket.on('connection', () => console.log('success'));
            socket.on('action', data => console.log('action', data));
            socket.on('error', e => console.log('Error: ' + (e ? e : 'unknown error')));
            socket.on('news', function (data) {
                console.log(data);
                socket.emit('my other event', {my: 'data'});
            });
        </script>
        </body>
        </html>
        `);
    });
};