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
    //console.log(messages);
    res.json(messages);
  });
});

router.get('/:id', (req, res) => {
  const messageID = req.params.id;
  console.log(messageID);
  return Messages.findOne({include:[{model: Users}, {model: Topics}],
    where: {
      id: messageID
    }
  })
  .then((message) => {
    return res.json(message);
  });
});

router.put('/:id/edit', (req, res) => {
  const messageID = req.params.id;
  console.log(messageID);
  return Messages.findOne({include:[{model: Users}, {model: Topics}],
    where: {
      id: messageID
    }
  })
  .then((oldMessage) => {
    if(oldMessage.author_id === req.user.id){
      return Messages.update({
        body: req.body.body
      },{
        where: {
          id: messageID
        }
      })
      .then((editedMessage) => {
        let messageInfo = {
          old: oldMessage,
          new: editedMessage
        }
        return res.json(messageInfo);
      });
    }
  });
});

module.exports = router;