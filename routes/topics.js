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

router.put('/:id', (req, res) => {
  const topicID = req.params.id;
  return Topics.findOne({
    where: {id: topicID}
  })
  .then((topic) => {
    if(topic){
      return Topics.update({
        name: req.body.name
      },{
        where: {
          id: topicID
        }
      });
    }
  });
});

module.exports = router;