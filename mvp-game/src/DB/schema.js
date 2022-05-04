const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const characterData = new mongoose.Schema({
  // design schema
  level: {type: Number, default: 0},
  name: String,
  experience: {type: Number, default: 0},
  health: {type: Number, default: 50},
  attack: {type: Number, default: 5},
  color: {type: String, default: 'green'}
})


const Character = mongoose.model('Character', characterData);

module.exports = {Character}
