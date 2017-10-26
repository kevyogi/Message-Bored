const express = require('express');
const router = express.Router();
const db = require('../models');
const Users = db.user;
const Messages = db.message;

router.post('/login', (req, res) => {
  console.log(req.body);
  Users.findOne({
    where: {name: req.body.name}
  })
  .then((user) => {
    if(user){
    res.json(user.id);
    }
  });
});

router.get('/', (req, res) => {
  Users.findAll({raw: true})
  .then((users) => {
    res.json(users);
  });
});

router.get('/:id', (req, res) => {
  const userID = req.params.id;
  return Users.findById(userID)
  .then((user) => {
    if(!user){
      return res.redirect('/');
    }else{
      return Messages.findAll({
        where: {
          author_id: userID
        },
        raw: true
      })
      .then((userMessages) => {
        let userInfo = {
          user: user.name,
          id: user.id,
          joinDate: user.createdAt,
          messages: userMessages
        }
        return res.json(userInfo);
      });
    }
  });
});

module.exports = router;