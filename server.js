require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const enforce = require('express-sslify');

const { dbURI, dbOps, port } = require('./config/environment');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Serve static assets if in production
if (process.env.NODE_ENG === 'production') {
  app.use(compression());
  app.use(enforce.HTTPS({ trustProtoHeader: true })); // trustProtoHeader => Heroku runs a reverse-proxy
  // Set static folder
  // app.use(express.static('client/build'));
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    // res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

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
