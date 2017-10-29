const express = require('express');
const router = express.Router();
const db = require('../models');
const Topics = db.topic;
const Users = db.user;
const Messages = db.message;

router.post('/', isAuthenticated, (req, res) => {
  console.log(req.body);
  return Topics.create({
    name: req.body.name,
    author_id: req.user.id
  })
  .then((topic) => {
    return Topics.findOne({include:[{model: Users}],
      where: {
        name: topic.name
      }
    })
    .then((topic) => {
      return res.json(topic);
    });
  })
  .catch((error) => {
    console.log(error);
  });
});

router.get('/', (req, res) => {
  return Topics.findAll({include: [{model: Users}]}, {raw:true})
  .then((topics) => {
    return res.json(topics);
  })
  .catch((error) => {
    console.log(error);
  });
});

router.get('/:id/messages', (req, res) => {
  return Messages.findAll({order: [['createdAt', 'ASC']], include:[{model: Users}],
   where: {topic_id: req.params.id}}, {raw:true})
  .then((data) => {
    Topics.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((topic) => {
      let topicData = {
        topic: topic,
        messages: data
      }
      console.log(topicData);
      return res.json(topicData);
    });
  })
  .catch((error) => {
    console.log(error);
  });
});

router.post('/:id', isAuthenticated, (req, res) => {
  const topicID = req.params.id;
  return Messages.create({
    body: req.body.body,
    author_id: req.user.id,
    topic_id: topicID
  })
  .then((message) => {
    return Messages.findOne({include:[{model:Users}],
      where: {
        id: message.id
      }
    })
    .then((newMessage) => {
      res.json(newMessage);
    });
  })
  .catch((error) => {
    console.log(error);
  });
});

//THE GOOD ONE
router.put('/:id', isAuthenticated, (req, res) => {
  const topicID = req.params.id;
  return Topics.findOne({
    where: {id: topicID}
  })
  .then((topic) => {
    if(topic.author_id === req.user.id){
      return Topics.update({
        name: req.body.name
      },{
        where: {
          id: topicID
        }
      })
      .then((updatedTopic) => {
        return res.json(updatedTopic);
      })
      .catch((error)=>{
        console.log(error);
      });
    }
  });
});

router.put('/:id/messages', (req, res) => {
  const messageID = req.body.id;
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
  })
  .catch((error) => {
    console.log(error);
  });
});

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()) {next();}
  else{console.log('mistake');
  }
}

module.exports = router;