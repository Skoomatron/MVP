const router = require('express').Router();
const controller = require('./Controller/index.js');

console.log('made it to the router')

router.post('/create', controller.create);
router.post('/delete', controller.deleteOne);
router.post('/gain', controller.gain);
router.get('/retrieve', controller.retrieve);

module.exports = router;