const model = require('../Model/index.js');

const create = async (req, res) => {
  await model.createData(req.body)
  .then((response) => {
    res.status(201).send('Character Created');
  })
  .catch((error) => {
    res.status(409).send(error)
  })
}

const deleteOne = async (req, res) => {
  await model.deleteCharacter(req.body._id)
  .then((response) => {
    res.status(200).send('Character Deleted');
  })
  .catch((error) => {
    res.status(404).send(error)
  })
}

const gain = async (req, res) => {
  await model.gainExp(req.body)
  .then((response) => {
    res.status(200).send('Earned a boosted')
  })
  .catch((error) => {
    res.status(404).send(error)
  })
}

const retrieve = async (req, res) => {
  await model.retrieveCharacters()
  .then((response) => {
    res.send(response);
  })
  .catch((error) => {
    res.status(400).send(error);
  })
}


module.exports = {
  create,
  retrieve,
  deleteOne,
  gain,
}