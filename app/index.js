const userRouter = require('./user/routes');
// const event = require('./event');

module.exports = (app) => {
    app.use('/user', userRouter);
};