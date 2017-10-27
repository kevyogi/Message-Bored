const express = require('express');
const router = express.Router();
const db = require('../models');
const Topics = db.topic;
const Users = db.user;
const Messages = db.message;

router.get('/', (req, res) => {
  Messages.findAll({raw: true})
  .then((messages) => {
    console.log(messages);
    res.json(messages);
  });
});

router.get('/latest', (req, res) => {
  Messages.findAll(
    {limit: 10, order: [['createdAt', 'DESC']],
    include: [{model: Topics}, {model: Users}]})
  .then((messages) => {
    console.log(messages);
    res.json(messages);
  });
});

module.exports = router;