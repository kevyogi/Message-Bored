const express = require('express');
const router = express.Router();
const db = require('../models');
const Topics = db.topic;
const Users = db.user;
const Messages = db.message;

// router.post('/', (req, res) => {
//   return Messages.create({

//   })
// })

module.exports = router;