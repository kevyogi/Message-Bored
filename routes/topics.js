const express = require('express');
const router = express.Router();
const db = require('../models');
const Topics = db.topic;
const Users = db.user;
const Messages = db.message;

router.post('/', (req, res) => {
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
  });
});

router.get('/', (req, res) => {
  return Topics.findAll({include: [{model: Users}]}, {raw:true})
  .then((topics) => {
    return res.json(topics);
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
  });
});

router.post('/:id', (req, res) => {
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
  });
});

// router.get('/:id', (req, res) => {
//   console.log('backend:', req.params.id);
//   return Topics.findOne({include: [{model: Users}, {model: Messages}],
//     where: {
//       id: req.params.id
//     }
//   })
//   .then((data) => {
//     console.log(data);
//     res.json(data);
//   });
// });

// router.get('/', (req, res) => {
//   return Topics.findAll({include: [{model: Users}]}, {raw:true})
//   .then((topics) => {
//     if(topics){
//       return Users.findAll({raw:true})
//       .then((users) => {
//         let data = {
//           topics: topics,
//           users: users
//         }
//         return res.json(data);
//       });
//     }
//   });
// });


//THE GOOD ONE
router.put('/:id', (req, res) => {
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

// router.put('/:id', (req, res) => {
//   const topicID = req.params.id;
//   return Topics.findOne({
//     where: {id: topicID}
//   })
//   .then((topic) => {
//     if(topic.author_id === req.user.id){
//       return Topics.update({
//         name: req.body.name
//       },{
//         where: {
//           id: topicID
//         }
//       })
//       .then((updatedTopic) => {
//         return Messages.findAll({
//           where: {
//             topic_id: updatedTopic.id
//           }
//         })
//         .then((messages) => {
//           let newData = {
//             data: {
//               messages: messages,
//               topic: updatedTopic
//             }
//           }
//           return res.json(newData);
//         })
//       })
//       .catch((error)=>{
//         console.log(error);
//       });
//     }
//   });
// });

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()) {next();}
  else{console.log('mistake');
  }
}

module.exports = router;