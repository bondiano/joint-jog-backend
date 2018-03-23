const express = require('express');
const passport = require('passport');
const authenticateMiddleware = require('../../middlewares/authenticateMiddleware');

const router = express.Router();

require('./model');
const controller = require('./controllers');

router.get('/', controller.getAll);

router.get('/:id', controller.getOne);

router.patch('/:id', authenticateMiddleware, controller.edit);

router.post('/create', authenticateMiddleware, controller.create);

router.post('/sub', authenticateMiddleware, controller.subscribe);

router.post('/unsub', authenticateMiddleware, controller.unsubscribe);

/**
 * Export a router with paths
 * GET: /
 * GET: /:id
 * PATCH: /:id
 * POST: /create
 * POST: /sub
 * POST: /unsub
 */
module.exports = router;