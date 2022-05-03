const compression = require('compression');
const router = require('./routes.js');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(router);
app.use(compression({threshold: 0, level: 9}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../../dist')));

const PORT = 3001;

app.listen(process.env.PORT, () => {
  console.log(`We in this port ${PORT} !`)
});

module.exports = app;