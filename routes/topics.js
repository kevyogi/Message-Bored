const express = require('express');
const router = express.Router();
const db = require('../models');
const Topics = db.topic;
const Users = db.user;

router.post('/', (req, res) => {
  Topics.create({
    name: req.body.name,
    created_by: req.user.id
  });
});

router.get('/', (req, res) => {
  return Topics.findAll({raw:true})
  .then((topics) => {
    // res.json(topics);
    if(topics){
      return Users.findAll({raw:true})
      .then((users) => {
        let data = {
          messages: messages,
          users: users
        }
        return res.json(data);
      });
    }
  });
});

module.exports = router;