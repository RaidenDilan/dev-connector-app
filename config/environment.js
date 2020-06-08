const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';
const dbURI = `mongodb://${process.env.MONGO_UN}:${process.env.MONGO_PASSWORD}@ds161700.mlab.com:61700/${process.env.MONGO_DB}`;
const dbOps = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
const secret = 'secret_dev_key'

module.exports = { port, env, secret, dbURI, dbOps };