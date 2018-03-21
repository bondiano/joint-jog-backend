const express = require('express');
const passport = require('passport');

const router = express.Router();

require('./model');
const controller = require('./controllers');

router.get('/', controller.getAll);

router.get('/:id', controller.getOne);

router.patch('/:id', passport.authenticate('jwt', { session: false}), controller.edit);

router.post('/create', passport.authenticate('jwt', { session: false}), controller.create);

router.post('/sub', passport.authenticate('jwt', { session: false}), controller.subscribe);

router.post('/unsub', passport.authenticate('jwt', { session: false}), controller.unsubscribe);

/**
 * Export a router with paths
 * GET: /
 * GET: /:id
 * POST: /create
 * POST: /sub
 * POST: /unsub
 */
module.exports = router;