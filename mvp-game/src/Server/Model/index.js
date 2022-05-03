const db = require('../../DB/index.js');
const {Character} = require('../../DB/schema.js');

const createData = async (params) => {
  try {
    db.collection('characters').insertOne({
      name: params.name,
      level: 0,
      experience: 0,
    })
  } catch (error) {
    return error;
  }
}

const deleteCharacter = async (params) => {
  console.log(params)
  try {
    Character.find({_id: params}).deleteOne().exec()
  } catch (error) {
    return error;
  }
}

const retrieveCharacters = () => {
  return Character.find({});
}



module.exports = {
  createData,
  retrieveCharacters,
  deleteCharacter,
}