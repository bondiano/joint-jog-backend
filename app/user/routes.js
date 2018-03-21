const express = require('express');
const passport = require('passport');

const router = express.Router();

require('./model');
const controller = require('./controllers');

router.post('/', controller.login);

router.post('/login', controller.login);

router.post('/register', controller.register);

router.get('/profile', passport.authenticate('jwt', { session: false}), controller.currentUser);

router.patch('/profile', passport.authenticate('jwt', { session: false}), controller.editProfile);

router.get('/profile/:username', passport.authenticate('jwt', { session: false}), controller.profile);

/**
 * Export a router with paths
 * POST: /
 * POST: /login
 * POST: /register
 * GET: /profile
 * PATCH: /profile
 * GET: /profile/:username
 */
module.exports = router;