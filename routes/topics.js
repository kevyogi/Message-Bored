const express = require('express');
const router = express.Router();
const db = require('../models');
const Topics = db.topic;

router.post('/', (req, res) => {
  Topics.create({
    name: req.body.name,
    created_by: req.user.id
  });
});

router.get('/', (req, res) => {
  Topics.findAll({raw:true})
  .then((topics) => {
    res.json(topics);
  });
});

module.exports = router;