const express = require('express');
const router = express.Router();
const users = require('./users');
const topics = require('./topics');
const messages = require('./messages');

router.use('/users', users);
router.use('/topics', topics);
router.use('/messages', messages);


module.exports = router;