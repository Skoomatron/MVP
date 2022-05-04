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

const gainExp = async (params) => {
  try {
    await Character.findOneAndUpdate({_id: params._id}, {$inc: {experience: params.experience}}, {new: true})
  } catch (error) {
    return error;
  }
}

const gainLevel = async (params) => {
  try {
    await Character.findOneAndUpdate({_id: params._id}, {$inc: {experience: -100, level: 1, health: params.health, attack: params.attack}}, {new: true})
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
  gainExp,
  gainLevel,
}