require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { dbURI, dbOps, port } = require('./config/environment');

const app = express();

mongoose
  .connect(dbURI, dbOps)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log('MongoDB failed to connect!', err));

app.listen(port, () => console.log(`Server running on port ${ port }`));