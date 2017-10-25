const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.listen(PORT, () => {
  db.sequelize.sync({ force: true });
  console.log(`Listening on port: ${PORT}`);
});