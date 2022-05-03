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

const retrieve = async (req, res) => {
  console.log('inside retrieve controller')
  await model.retrieveCharacters()
  .then((response) => {
    console.log(response, 'response inside controller retreive')
  })
  .catch((error) => {
    console.log(error, 'error inside controller retrieve')
  })
}


module.exports = {
  create,
  retrieve
}