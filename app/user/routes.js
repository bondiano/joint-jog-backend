const express = require('express');
const router = express.Router();

require('./model');
const controller = require('./controllers');

router.get('/', controller.login);

router.post('/', controller.register);

router.get('/login', controller.login);

router.post('/register', controller.register);

router.get('/auth', controller.auth);

router.get('/profile', controller.currentUser);

router.get('/profile/:id', controller.profile);

module.exports = router;