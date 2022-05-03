const router = require('express').Router();
const controller = require('./Controller/index.js');

console.log('made it to the router')

router.post('/create', controller.create);
router.get('/retrieve', controller.retrieve);

module.exports = router;