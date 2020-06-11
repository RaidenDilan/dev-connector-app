require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const { dbURI, dbOps, port } = require('./config/environment');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(dbURI, dbOps)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log('MongoDB failed to connect!', err));

// passport middleware
app.use(passport.initialize());
// passport config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(port, () => console.log(`Server running on port ${ port }`));
