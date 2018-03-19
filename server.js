
/**
 * Module dependencies
 */

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const config = require('./config');

const port = process.env.PORT || 3001;
const app = express();


app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));


connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

function listen () {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Express app started on port ' + port);
}

function connect () {
    const options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect(config.db, options).connection;
}

module.exports = app;