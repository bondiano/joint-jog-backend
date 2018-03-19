const config = require('./index'),
    mongoose = require('mongoose');

const cleanup = () => {
    mongoose.connection.close(function( ) {
        process.exit(0);
    });
};

module.exports = (app) => {
    mongoose.Promise = global.Promise;
    
    process.on('SIGINT', cleanup );
    process.on('SIGTERM', cleanup );
    process.on('SIGHUP', cleanup );
    
    if (app) {
        app.set('mongoose', mongoose);
    }
    return mongoose.connect(config.mongoUrl);
};
