const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');
const routes = require('./routes');
const path = require('path');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', routes);

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '/public') });
});

app.listen(PORT, () => {
  db.sequelize.sync({ force: true });
  console.log(`Listening on port: ${PORT}`);
});