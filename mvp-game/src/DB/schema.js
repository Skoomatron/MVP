const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const characterData = new mongoose.Schema({
  // design schema
  level: {type: Number, default: 0},
  name: {type: String, unique: true, dropDups: true},
  experience: {type: Number, default: 0},
})


const Character = mongoose.model('Character', characterData);

module.exports = (Character)
