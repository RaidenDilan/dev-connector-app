const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@devconnector.s3ubt.mongodb.net/${process.env.DB_NAME}-${env}?retryWrites=true&w=majority`;
const secret = 'secret_dev_key';

const dbOps = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

module.exports = {
  port,
  env,
  secret,
  dbURI,
  dbOps
};
