module.exports = {
  mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@devconnector.s3ubt.mongodb.net/${process.env.DB_NAME}-${env}?retryWrites=true&w=majority`,
  // mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY
};
