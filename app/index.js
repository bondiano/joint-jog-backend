const userRouter = require('./user/routes');
const eventRouter = require('./event/routes');

module.exports = (app) => {
    app.use('/user', userRouter);
    app.use('/event', eventRouter);
};