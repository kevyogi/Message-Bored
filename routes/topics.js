const express = require('express');
const router = express.Router();
const db = require('../models');
const Topics = db.topic;
const Users = db.user;

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

// router.post('/', (req, res) => {
//   return Topics.create({
//     name: req.body.name,
//     author_id: req.user.id
//   })
//   .then((topic) => {
//     return res.json(topic);
//   });
// });

router.get('/', (req, res) => {
  return Topics.findAll({include: [{model: Users}]}, {raw:true})
  .then((topics) => {
    return res.json(topics);
  });
});

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

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()) {next();}
  else{console.log('mistake');
  }
}

module.exports = router;