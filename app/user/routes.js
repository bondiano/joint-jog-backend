const express = require('express');
const router = express.Router();

require('./model');
const controller = require('./controllers');

router.get('/', controller.main);

module.exports = router;