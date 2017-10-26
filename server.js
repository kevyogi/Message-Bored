const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('./models');
const routes = require('./routes');
const path = require('path');
const redis = require('connect-redis')(session);
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const saltRounds = 12;
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/api', routes);
app.use(session({
  store: new redis(),
  secret: 'strejk',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('serializing');
  return done(null, {
    id: user.id,
    name: user.name
  });
});

passport.deserializeUser((user, done) => {
  console.log(user);
  console.log('deserializing');
  db.user.findOne({where: { id: user.id }})
  .then((user) => {
    return done(null, {
      id: user.id,
      name: user.name
    });
  });
});

passport.use(new LocalStrategy({usernameField: 'name'}, function (name, password, done) {
  db.user.findOne({where: {name: name}})
    .then((user) => {
      if(user === null){
        return done(null, false, {message: 'bad username or password'});
      }else{
        bcrypt.compare(password, user.password)
        .then((res) => {
          console.log(res);
          if(res){
            var foundUser = user.get();
            delete foundUser.password;
            console.log('LocalStrategy:', foundUser);
            return done(null, foundUser); //typically don't send the whole user back because it contains password and stuff
          }else{
            return done(null, false, {message: 'bad username or password'});
          }
        });
      }
    })
    .catch((error) => {
      console.log('ERROR:', error);
    });
}));

// app.get('/', (req, res) => {
//   console.log('login');
//   res.render('partials/login');
// });

app.post('/api/login', passport.authenticate('local'), function(req, res){
  const user = req.user.data;
  console.log('user:', user);
  console.log('backend login response:', req.user);

  res.json(req.user);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.sendStatus(200);
});

app.post('/api/register', (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(req.body.password, salt, function(err, hash){
      db.user.create({
        name: req.body.name,
        password: hash
      })
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        return res.send('Stupid username');
      });
    });
  });
});

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()) {next();}
  else{res.redirect('/');
  }
}

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '/public') });
});

app.listen(PORT, () => {
  db.sequelize.sync({ force: false });
  console.log(`Listening on port: ${PORT}`);
});