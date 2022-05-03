const db = require('../../DB/index.js');
const Character = require('../../DB/schema.js');

const createData = async (params) => {
  try {
    db.collection('Character').insertOne({
      name: params.name,
      level: 0,
      experience: 0,
    })
  } catch (error) {
    return error;
  }
}

const retrieveCharacters = async (res) => {
  const query = Character.find({});
  query.exec((error, data) => {
    if (error) {
      return error;
    }
    console.log(data)
    res.send(data);
  })
}



module.exports = {
  createData,
  retrieveCharacters
}