const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const process = require('./nodemon.json')
const app = express();

const mediaRoutes = require('./api/routes/media');
const accountRoutes = require('./api/routes/accounts');
const authRoutes = require('./api/routes/auth');
const playerRoutes = require('./api/routes/player');

mongoose.connect('mongodb+srv://mongUdmin:'
  + process.env.MONGO_ATLVS_PWORD +
  '@mar-de-mediadb.rt36pwq.mongodb.net/?retryWrites=true&w=majority&appName=Mar-de-MediaDB'
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/media', mediaRoutes);
app.use('/accounts', accountRoutes);
app.use('', authRoutes);
app.use('/', playerRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;