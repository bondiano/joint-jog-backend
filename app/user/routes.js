const express = require('express');
const passport = require('passport');
const authenticateMiddleware = require('../../middlewares/authenticateMiddleware');
const router = express.Router();

require('./model');
const controller = require('./controllers');

router.post('/', controller.login);

router.get('/', authenticateMiddleware, controller.tryWithJWT);

router.post('/login', controller.login);

router.post('/register', controller.register);

router.get('/profile', authenticateMiddleware, controller.currentUser);

router.patch('/profile', authenticateMiddleware, controller.editProfile);

router.get('/profile/:username', authenticateMiddleware, controller.profile);

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