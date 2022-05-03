const mongoose = require('mongoose');
const mongooseURL = 'mongodb://localhost/gameDB';

mongoose.connect(mongooseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.once('connected', () => {
  console.log('MONGO HUNGRY!!');
});

module.exports = db;