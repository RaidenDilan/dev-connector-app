require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const { dbURI, dbOps, port } = require('./config/environment');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// // Serve static assets if in production
// if (process.env.NODE_ENG === 'production') {
//   app.use(express.static('client/build')); // Set static folder
//   app.get('*', (req, res) => res.sendfile(path.resolve(__dirname, 'cleint', 'build', 'index.html')));
// }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, dbOps);
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();
// mongoose
//   .connect(dbURI, dbOps)
//   .then(() => console.log('MongoDB Connected!'))
//   .catch(err => console.log('MongoDB failed to connect!', err));

// passport middleware
app.use(passport.initialize());
// passport config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Serve static assets if in production
if (process.env.NODE_ENG === 'production') {
  app.use(express.static('client/build')); // Set static folder
  app.get('*', (req, res) => res.sendfile(path.resolve(__dirname, 'cleint', 'build', 'index.html')));
}

app.listen(port, () => console.log(`Server running on port ${ port }`));
